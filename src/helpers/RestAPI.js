/**
 * implement Rest api methods
 *
 * @namespace RestAPI
 * @memberOf helpers
 *
 * @example
 * import { RestAPI } from 'helpers'
 *
 * const request = RestApi.get('api').then(resp => {
 *  // work with server response
 * }).catch(resp => {
 *  // work with server exception
 * })
 **/

import axios from 'axios'
import { get as getStorageValue } from './Storage'

import { NODE_ENV } from '../config'

/**
 * Returns backend api url
 *
 * @function
 * @static
 * @private
 * @memberOf helpers.RestAPI
 *
 * @example
 * const url = getBackendApiUrl() // returns 'http://localhost:3001'
 *
 * @example
 * const url = getBackendApiUrl('path') // returns 'http://localhost:3001/path'
 *
 * @param {String} path [path=""] - backend url path
 * @return {String} - Backend api url
 **/
const getBackendApiUrl = (path = '') => {
  return `http://localhost:8080${path}`
}

/**
 * Replace params in string
 *
 * @private
 * @function
 * @memberOf helpers.RestAPI
 *
 * @example
 * const url = replaceUrlParams('api/:brand_id', {brand_id:5})
 * // returns 'api/5'
 *
 * @param {String} url - calling url
 * @param {Object} params - query params
 *
 * @return {String} - new line with parameter substitution
 **/
export const replaceUrlParams = (url, params) => {
  return url.replace(/:[_|A-z]+/g, match => {
    const matchedParam = match.substr(1)
    const value = params[matchedParam]
    const valueIsUndefined = typeof value === 'undefined'

    if (valueIsUndefined) {
      console.warn(
        `Matched param "${matchedParam}" is not presented at given object, url ${url}, params ${JSON.stringify(
          params
        )}`
      )
    }
    return valueIsUndefined ? '' : value
  })
}

/**
 * Instance of axios
 *
 * @private
 * @constant
 * @memberOf helpers.RestAPI
 * @type {AxiosInstance}
 **/
const apiInstance = axios.create({
  baseURL: `${getBackendApiUrl()}`
})

/**
 *
 * @function
 * @static
 * @private
 * @memberOf helpers.RestAPI
 *
 * @param {String} method - type of call method
 * @return {Promise} - axios promise
 */
const createRequest = method => {
  const req = function(url, params = {}, data = {}) {
    let headers = {}

    if (url !== 'login') {
      headers['Authorization'] = `Bearer ${getStorageValue(
        'AuthorizationToken'
      )}`
    }

    const normalizedUrl = replaceUrlParams(url, { ...params, ...data })

    return apiInstance.request({
      method,
      headers,
      url: normalizedUrl,
      data,
      params
    })
  }
  // req.method = method
  return req
}

/**
 * =====================================================================================================================
 * EXPORTING API METHODS
 * =====================================================================================================================
 */

/**
 * GET
 *
 * @function
 * @memberOf helpers.RestAPI
 *
 * @example
 * import { RestAPI } from 'helpers'
 * const request = RestApi.get(URL, {query}) // calling to URL?queryToString
 *
 * @param {String} url - calling url
 * @param {Object} query - query object
 *
 * @return {Promise} - axios promise, ajax call to getBackendApiUrl('queryString')
 **/
export const get = createRequest('get')

/**
 * API put call
 *
 * @function
 * @memberOf helpers.RestAPI
 *
 * @example
 * import { RestAPI } from 'helpers'
 * const request = RestApi.put(URL, {body})
 *
 * @param {String} url - calling url
 * @param {Object} params - query params
 * @param {Object} body - body of request
 *
 * @return {Promise}
 **/
export const put = createRequest('put')

/**
 * API post call
 *
 * @function
 * @memberOf helpers.RestAPI
 *
 * @example
 * import { RestAPI } from 'helpers'
 * const request = RestApi.post('url', params)
 *
 * @param {String} url - calling url
 * @param {Object} params - query params
 * @param {Object} body - body of request
 *
 * @return {Promise}
 **/
export const post = createRequest('post')

/**
 * API delete call
 *
 * @function
 * @memberOf helpers.RestAPI
 *
 * @example
 * import { RestAPI } from 'helpers'
 * const request = RestApi.del('entity')
 *
 * @example
 * import { RestAPI } from 'helpers'
 * const request = RestApi.del('entity/5')
 *
 * @param {String} url - calling url
 * @return {Promise}
 **/
export const del = createRequest('del')

/**
 * API json (form data with files) call
 *
 * @function
 * @memberOf helpers.RestAPI
 *
 * @param {String} url - calling url
 * @param {Object} params - query params
 * @param {Object} body - body of request
 *
 * @return {Promise}
 **/
export const json = createRequest('json')

/**
 * extend window object, for implement global api calling
 */
if (typeof window !== 'undefined') {
  Object.assign(window, {
    RestApi: {
      get,
      put,
      post,
      del,
      json
    }
  })
}

/**
 * exports private functions for implement tests
 */
if (NODE_ENV === 'test') {
  exports.getBackendApiUrl = getBackendApiUrl
  exports.replaceUrlParams = replaceUrlParams
  exports.apiInstance = apiInstance
  exports.createRequest = createRequest
}
