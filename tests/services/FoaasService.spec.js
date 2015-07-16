describe("FoaasService", function() {
    var $httpBackend, foaasService,
        foaasUrl = 'http://www.foaas.com';

    beforeEach(module('app'));

    beforeEach(inject(function($injector, _FoaasService_) {
        $httpBackend = $injector.get('$httpBackend');
        foaasService = _FoaasService_;

    }));
    
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("should get operations", function() {
        $httpBackend.expectGET(foaasUrl+'/operations').respond(200, {});

        foaasService.getOperations();

        $httpBackend.flush()

    });

    it("should call correct api endpoint", function() {
        $httpBackend.expectGET(foaasUrl+'/awesome/foo').respond(200, {});

        foaasService.callUrl('/awesome/foo', false);
        $httpBackend.flush()


        $httpBackend.expectGET(foaasUrl+'/awesome/foo?shoutcloud').respond(200, {});        
        foaasService.callUrl('/awesome/foo', true);        
        $httpBackend.flush()

    });

});