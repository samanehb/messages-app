
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
     * 
     * Implementation notes: use this to hide properties that may be added to this object for application layer logic 
     *  while not needed to be seen outside
     *  This is also important for properly maintaining api models and versioning
     */
    getApiModel(/*version: api versioning string*/) {
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