import _isObject from 'lodash/isObject';
import _reduce from 'lodash/reduce';
import update from 'immutability-helper';

const getSpecObj = (obj) => {
  let specObject = {};
  if (_isObject(obj)) {
    specObject = { $unset: ['__typename'] };
    return _reduce(
      obj,
      (acc, value, field) => {
        if (field === '__typename') {
          return acc;
        }
        acc[field] = getSpecObj(value);
        return acc;
      },
      specObject
    );
  }
  return {};
};

/**
 * Removes '__typename' property from input object recursively i.e.
 *  1. { name: 'Luffy', __typename: 'PersonEntity' } becomes { name: 'Luffy' }
 *  2. { users: [ { name: 'Luffy', __typename: 'PersonEntity' } ] }  becomes { users: [ { name: 'Luffy' } ] }
 *
 * @param {Object} obj
 * @returns {Object}
 */
function stripTypenames(obj) {
  const specObj = getSpecObj(obj);

  return update(obj, specObj);
}

export { stripTypenames };
