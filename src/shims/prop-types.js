// Minimal no-op PropTypes shim to avoid requiring the external 'prop-types' package
// Provides the subset of validators used in the project. All validators are no-ops
// and include an `.isRequired` chain to match PropTypes API.

function createValidator() {
    const validator = () => null;
    validator.isRequired = validator;
    return validator;
}

const PropTypes = {
    number: createValidator(),
    string: createValidator(),
    func: createValidator(),
    bool: createValidator(),
    object: createValidator(),
    arrayOf: () => createValidator(),
    shape: () => createValidator(),
};

export default PropTypes;
