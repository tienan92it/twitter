/**
 * Created by AnTran on 4/2/17.
 */
import signature, {
    getNonce,
    getNow,
} from './signature';

import {
    fromQueryString,
    toQueryString,
    encode,
} from './uri';


let testNonce;
let testNow;


export const getHeaders = (url, params, data, consumerKey, consumerSecret,
                           method, oauthToken = '', oauthSecret = '') => {
    const nonce = getNonce(32);
    const now = getNow();
    const sig = signature({
        url,
        consumerKey,
        consumerSecret,
        oauthToken,
        oauthSecret,
        params,
        method,
        data,
        nonce,
        now,
    });
    const header = `OAuth oauth_consumer_key="${encode(consumerKey)}",
    oauth_nonce="${encode(nonce)}",
    oauth_signature="${encode(sig)}",
    oauth_signature_method="HMAC-SHA1",
    oauth_timestamp="${encode(now)}",
    ${oauthToken && 'oauth_token="'}${oauthToken}${oauthToken && '",'}
    oauth_version="1.0"`.replace(/\n? +\n? */g, ' ');
    return {Authorization: header};
}