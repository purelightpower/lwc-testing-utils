class AddressParser {
    static parse(string) {
        let parts = string.split(", ");
        let [province, postalCode] = parts[2].split(" ");
        return {
            street: parts[0],
            city: parts[1],
            province,
            postalCode,
            country: parts[3],
        };
    }
}

export default AddressParser;