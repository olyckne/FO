describe("FoaasService", function() {
    var $httpBackend, foaasService,
        createController, $rootScope,
        $stateParams, controller,
        foaasUrl = 'http://www.foaas.com';

    beforeEach(module('app'));

    beforeEach(inject(function($injector, _FoaasService_) {
        $httpBackend = $injector.get('$httpBackend');
        foaasService = _FoaasService_;

        var $controller = $injector.get('$controller');

        $rootScope = $injector.get('$rootScope');
        $stateParams = $injector.get('$stateParams');
        $location = $injector.get('$location');

        createController = function createController() {
            return $controller('FoController', {
                '$scope': $rootScope,
                '$stateParams': $stateParams,
                '$location': $location,
                'FoaasService': foaasService
            });
        };

        $httpBackend.whenGET(foaasUrl+'/operations').respond(200, {});

        createController();
    }));


    it("should get operations fields", function() {
        $rootScope.getOperationsFields();
        expect($rootScope.operationFields).toEqual("");

        var expectedValue = '<div class="form-group">'+
                                '<label for="from">From</label>'+
                                '<input select-on-click ng-model="fields.from" id="from" class="form-control" type="text" name=":from">'+
                                '</div>';

        $rootScope.selectedOperation = {
            name: 'Awesome',
            url: '/awesome/:from',
            fields: [
                {
                    field: "from",
                    name: "From"
                }
            ]
        };

        $httpBackend.expectGET(foaasUrl+'/awesome/:from').respond(200, {});

        $rootScope.getOperationsFields();
        expect($rootScope.operationFields).toEqual(expectedValue);
        $httpBackend.flush();
    });

    it("should generate a share link", function() {

        $rootScope.selectedOperation = {
            name: 'Awesome',
            url: '/awesome/:from',
            fields: [
                {
                    field: "from",
                    name: "From"
                }
            ]
        };
        $rootScope.fields = {
            from: 'foo'
        }

        expect($rootScope.getShareLink()).toEqual('http://server/fuck/awesome/foo');

        $rootScope.shout = true;

        expect($rootScope.getShareLink()).toEqual('http://server/fuck/awesome/foo?shoutcloud');
    });

    it("should map place holder to inputs", function() {
        $rootScope.selectedOperation = {
                name: "Fuck Off",
                url: "/off/:name/:from",
                fields: [
                    {
                        field: "name",
                        name: "Name"
                    },
                    {
                        field: "from",
                        name: "From"
                    }
                ]
            };
         
        $rootScope.fuckOff = {
            message: 'Fuck off, :name.',
            subtitle: '- :from'
        };
        

        var expectedMessage = "Fuck off, {{fields.name}}.";
        var expectedSubtitle = "{{fields.from}}";
        $rootScope.mapPlaceHoldersToInputs();
        expect($rootScope.message).toEqual(expectedMessage);
        expect($rootScope.subtitle).toEqual(expectedSubtitle);
        $httpBackend.flush();
    });


    it("should get a fuck off", function() {
        $rootScope.selectedOperation = {
            name: 'Awesome',
            url: '/awesome/:from',
            fields: [
                {
                    field: 'from',
                    name: 'From'
                }
            ]
        };

        $httpBackend.expectGET(foaasUrl+'/awesome/:from').respond(200, {
            message: 'This is fucking awesome.',
            subtitle: ':from'
        });


        $rootScope.getFuckOff();
        $httpBackend.flush();
        expect($rootScope.fuckOff).toEqual({
            message: 'This is fucking awesome.',
            subtitle: ':from'
        });
        
                $rootScope.selectedOperation = {
            name: 'Awesome',
            url: '/awesome/:from',
            fields: [
                {
                    field: 'from',
                    name: 'From'
                }
            ]
        };
        $httpBackend.expectGET(foaasUrl+'/awesome/:from').respond(500);
        $rootScope.getFuckOff();
        $httpBackend.flush();

        expect($rootScope.fuckOff).toEqual({message: 'Something went wrong...'});

    });

});