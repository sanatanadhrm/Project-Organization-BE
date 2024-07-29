class GetOrganization {
    constructor (payload) {
        this._verifyPayload(payload)
    
        const { id, name, } = payload
        
        this.id = id
        this.name = name
    
        }
}