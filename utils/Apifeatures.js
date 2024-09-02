class Apifeatures {
    constructor(query, queryStr) {
        this.query = query;  // Mongoose query
        this.queryStr = queryStr;  // Request query parameters
    }

    filter() {
        let excludeFields = ['sort', 'page', 'limit', 'fields'];
        const queryObj = { ...this.queryStr };

        // Exclude fields not used in filtering
        excludeFields.forEach(el => delete queryObj[el]);

        // Handle specific cases
        if (queryObj.name) {
            // Apply regex for partial name matches
            queryObj['name.english'] = { $regex: queryObj.name, $options: 'i' }; // Case-insensitive
            delete queryObj.name; // Remove name from queryObj to avoid conflicts
        }

        // Transform query parameters for MongoDB
        let queryStr1 = JSON.stringify(queryObj);
        queryStr1 = queryStr1.replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}`);

        let queryObj2 = JSON.parse(queryStr1);

        // Ensure values are strings where expected
        for (const key in queryObj2) {
            if (typeof queryObj2[key] === 'object') {
                continue; // Skip object values to avoid cast errors
            }
            queryObj2[key] = String(queryObj2[key]);
        }

        this.query = this.query.find(queryObj2);
        return this;
    }

    sort() {
        if (this.queryStr.sort) {
            const sortBy = this.queryStr.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            // Default sorting
            this.query = this.query.sort('id'); // Default to sorting by ID
        }
        return this;
    }

    limitFields() {
        if (this.queryStr.fields) {
            const fields = this.queryStr.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }
        return this;
    }

    paginate() {
        const page = this.queryStr.page * 1 || 1;
        const limits = this.queryStr.limit * 1 || 16;
        const skip = (page - 1) * limits;
        this.query = this.query.skip(skip).limit(limits);
        return this;
    }
}

module.exports = Apifeatures;
