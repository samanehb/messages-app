
export default class ObjectModel {

    /**
     * param: docType: give a type for this object to be used as a key to fetch only this type from database
     * not needed to be set if the ObjectModel doesn't need to be persisted
     */
    constructor(docType) {
        this._docType = docType; // not using class name, since it may change later
    }

    get modelName() {
        return this.constructor.name;
    }
    /**
     * Converting raw object to this model/prototype
     */
    static copy(/*obj*/) {
    }

    /**
     * Returns the object that should be returned by or consumed by apis, considering the api version
     * Throws Error if facing unsupported version (a supported version is decided by child/model implementation)
     * 
     * Implementation notes: use this to hide properties that may be added to this object for application layer logic 
     *  while not needed to be seen outside
     *  This is also important for properly maintaining api models and versioning
     */
    getApiModel(version, isUnsupportedVersion) {
        // since routing handles versions, this can only happen if a programming mistake ocurrs where router is added for a version but object model for that version is not supported
        // this error is expected to be easily found at time of testing of new apis, so should not ocur when apis are shipped to customer
        // if thrown, should be catched (by promise.catch) and converted to 500 error
        if(isUnsupportedVersion) {
            throw new Error('Invalid api version. No response model is found for this version.');
        }
        return {};
    }

    /**
     * Returns the object the way it should be persisted into database. 
     * 
     * Implementation notes: The returned object should be independent of various versioning of api models
     *  but should also not be affected by properties added to this object during manipulation of data in application layer, 
     *  only contain what needs to be persisted
     */
    getPersistedModel() {
        return {};
    }

    /**
     * Return a simple example of what the api model should look like
     */
    getExample() {
        return {};
    }
}