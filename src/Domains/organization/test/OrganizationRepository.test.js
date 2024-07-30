const OrganizationRepository = require('../OrganizationRepository');

describe('OrganizationRepository interface', () => {
    it('should throw error when invoke abstract behavior', async () => {
        // Arrange
        const organizationRepository = new OrganizationRepository();
    
        // Action and Assert
        await expect(organizationRepository.createOrganization({})).rejects.toThrow('ORGANIZATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(organizationRepository.getAllOrganization()).rejects.toThrow('ORGANIZATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    });
});
