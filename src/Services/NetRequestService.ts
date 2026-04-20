/**
 *   File NetService
 *
 *   Created KayCM
 **/
import {Platform} from 'react-native'
import axios from 'axios';
const USER_AGENT_IOS = "Mozilla/5.0 \(iPhone; CPU iPhone OS 9_1 like Mac OS X\) AppleWebKit/601.1.46 \(KHTML, like Gecko\) Version/9.0 Mobile/13B143 Safari/601.1"
const USER_AGENT_ANDROID = "Mozilla/5.0 \(Linux; Android 6.0.1; SM-C7000 Build/MMB29M; wv\) AppleWebKit/537.36 \(KHTML, like Gecko\) Version/4.0 Chrome/55.0.2883.91 Mobile Safari/537.36 Language/zh_CN"
export const USER_AGENT = Platform.OS === "ios" ? USER_AGENT_IOS : USER_AGENT_ANDROID


/**
 * get请求
 * @param url {string} 请求地址
 * @param params {object} 请求参数
 * @param noPreResponse {boolean} 是否取消自动加工响应
 * @param noPreParams {boolean} 是否取消自动加工参数
 * @param opts {object} 配置
 * @returns {*}
 */
function R_GET(url: any, params = {},showLog=false, opts = {}) {
    return _FETCH(url, params, optionsMerge(opts, {method: 'GET'}),showLog);
}

/**
 * post请求
 * @param url {string} 请求地址
 * @param params {object} 请求参数
 * @param opts {object} 配置
 * @returns {*}
 */
function R_POST(url: any, params = {}, opts = {},showLog=false) {
    return _FETCH(url, params, optionsMerge(opts, {method: 'POST'}),showLog);
}

/**
 * delete
 * @param url
 * @param params
 * @param opts
 * @returns {Promise<never>|Promise<*>}
 * @constructor
 */
function R_DELETE(url: any, params = {}, opts = {}) {
    return _FETCH(url, params, optionsMerge(opts, {method: 'DELETE'}));
}

/**
 * 合并配置项
 * @param opts1 {object}
 * @param opts2 {object}
 * @returns {object}
 */
function optionsMerge(opts1: any, opts2: any) {
    try {
        return Object.assign({}, opts1, opts2);
    } catch (e) {
        return opts2;
    }
}

/**
 * axios选项处理器
 * @param url {string}
 * @param params {object}
 * @param opts {object}
 * @returns {Promise<{aoh_err: *}|{aoh_opts: {headers: {}, url: *}}>}
 */
async function axiosOptsHandler(url: any, params: any, opts: any) {

    url = "https://vps-sg-aws-opc.43046721.xyz" + url


    try {
        let aoh_opts = {
            headers: {},
            url,
            ...opts,
        };

        const globalToken = global.token;

        if (globalToken) {
            aoh_opts.headers = {
                'Member-Authorization':globalToken,
                ...aoh_opts.headers,
            };
        }
        if (opts.method === 'GET') {
            aoh_opts.params = params;
            aoh_opts.headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...aoh_opts.headers,
            };
        } else {
            aoh_opts.data = params;
            aoh_opts.headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...aoh_opts.headers,
            };
        }
        // const signature = await signatureHandler(params);
        aoh_opts.headers = {
            ...aoh_opts.headers,
        };
        return {aoh_opts};
    } catch (e) {
        return {aoh_err: e};
    }
}

/**
 * 响应处理器
 * @param res {object}
 * @param noPre {boolean}
 * @returns {{rh_err: *}|{rh_res: *}}
 */
function responseHandler(res: any) {
    try {
        let _result = res;

        const {code} = _result

        if (code == 200){
            //successLog(res)
            return {rh_res:_result};
        }else{
            //errorLog(_result)
            return {rh_res: _result};
        }

    } catch (e) {
        return {rh_err: e};
    }
}

/**
 * 异常处理器
 * @param err {*}
 * @returns {{errMsg: *}}
 */
function errorHandler(err: any) {
    const errMsg = _parseErrorMsg(err);
    return { errMsg, };
}

/**
 * 处理错误信息
 * @param err {object}
 * @param status {number}
 * @returns {object}
 * @private
 */
function _parseErrorMsg(err: string) {
    // errorLog(err);
    return err;
}

/**
 * axios 实例
 * @type {AxiosInstance}
 */
const axiosInstance = axios.create({
    timeout: 10 * 1000,
});

/**
 * axios 封装
 * @param url
 * @param param
 * @param options
 * @returns {Promise<never>|Promise<unknown>}
 * @private
 */
function _FETCH(url, param = {}, options = {},showLog=false) {

    if (url == undefined) {
        return Promise.reject("请求地址为空")
    }
    let params = {...param} // 避免修改入参param

    return new Promise(async (resolve,reject)=>{

        const {aoh_opts, aoh_err} = await axiosOptsHandler(url, params, options);
        if (aoh_err) {
            return reject(aoh_err);
        }

        axiosInstance.request(aoh_opts).then((res)=>{

            // if (showLog){
                console.log('NetService------------------->>') //headers  data
                console.log(url)
                console.log(aoh_opts.headers)
                console.log(params)
                console.log(res.data)
                console.log('<<-------------------NetService')
            // }

            const {data} = res;
            const {rh_res, rh_err} = responseHandler(data);
            if (rh_err) return reject(rh_err);
            resolve(rh_res);

        }).catch((err)=>{

            console.log('NetService err------------------->>') //headers  data
            console.log(url)
            console.log(aoh_opts.headers)
            console.log(params)
            console.log(err)
            console.log('<<-------------------err NetService')
            // const {errMsg} = errorHandler(err);
            reject(err);

        })

    })


}

export {R_GET, R_POST, R_DELETE};
