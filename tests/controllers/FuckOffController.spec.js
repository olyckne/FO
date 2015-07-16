describe("FoaasService", function() {
    var $httpBackend, foaasService,
        createController, $rootScope,
        $stateParams,
        foaasUrl = 'http://www.foaas.com';

    beforeEach(module('app'));

    beforeEach(inject(function($injector, _FoaasService_) {
        $httpBackend = $injector.get('$httpBackend');
        foaasService = _FoaasService_;

        $rootScope = $injector.get('$rootScope');
        $stateParams = $injector.get('$stateParams');

        var $controller = $injector.get('$controller');

        createController = function(stateParams) {
            return $controller('FuckOffController', {
                '$scope' : $rootScope,
                '$stateParams': stateParams,
                'FoaasService': foaasService 
            });
        };
    }));
    
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("should call correct api endpoint", function() {
        var response = {
            message: 'This is fucking awesome.',
            subtitle: '- foo'
        };
        
        $httpBackend.expectGET(foaasUrl+'/awesome/foo').respond(200, response);
        $stateParams.path = 'awesome/foo';
        var controller = createController($stateParams);

        $httpBackend.flush()

        expect($rootScope.fuckOff).toEqual(response);

        response = {
            message: 'THIS IS FUCKING AWESOME.',
            subtitle: '- FOO'
        }
        
        $httpBackend.expectGET(foaasUrl+'/awesome/foo?shoutcloud').respond(200, response);
        $stateParams.path = 'awesome/foo';
        $stateParams.shoutcloud = '?shoutcloud';
        var controller = createController($stateParams);
        $httpBackend.flush()

        expect($rootScope.fuckOff).toEqual(response);

        $httpBackend.expectGET(foaasUrl+'/awesome/foo?shoutcloud').respond(500);
        $stateParams.path = 'awesome/foo';
        $stateParams.shoutcloud = '?shoutcloud';
        var controller = createController($stateParams);
        $httpBackend.flush()

        expect($rootScope.fuckOff).toEqual({message: "Something went wrong..."});

    });

});