class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObject = { ...this.queryString };
    const excludingElemnet = ["page", "sort", "limit", "fields", "search"];
    excludingElemnet.forEach((el) => delete queryObject[el]);
    // A2)Advance Filtering
    // let queryFilter = JSON.stringify(queryObject);
    // queryFilter = queryFilter.replace(
    //     /\b(gt|gte|lt|lte)\b/g,
    //     (str) => `$${str}`
    // );
    const fixedQuery = {};

    for (const key in queryObject) {
      const match = key.match(/^(.+)\[(.+)\]$/);
      if (match) {
        fixedQuery[match[1]] = {
          [`$${match[2]}`]: queryObject[key],
          // $options: "i",
        };

        if (Object.keys(fixedQuery[match[1]]) == "$regex") {
          fixedQuery[match[1]] = {
            [`$${match[2]}`]: queryObject[key],
            $options: "i",
          };
        }
      } else {
        fixedQuery[key] = queryObject[key];
      }
    }
    this.query = this.query.find(fixedQuery);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  search() {
    if (this.queryString.search) {
      const query = this.queryString.search.split(" ").join("+");

      this.query = this.query.find({
        $text: {
          $search: query,
          $caseSensitive: false,
        },
      });
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate() {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
export default APIFeatures;
