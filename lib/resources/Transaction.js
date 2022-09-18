/* Copyright 2015-2016 PayPal, Inc. */
/* Copyright 2020 Beonex GmbH */
"use strict";

var generate = require('../generate');
var api = require('../api');

/**
 * fields string
    Indicates which fields appear in the response. Value is a single field or a comma-separated list of fields. The transaction_info value returns only the transaction details in the response. To include all fields in the response, specify fields=all. Valid fields are:
    transaction_info. The transaction information. Includes the ID of the PayPal account of the payee, the PayPal-generated transaction ID, the PayPal-generated base ID, the PayPal reference ID type, the transaction event code, the date and time when the transaction was initiated and was last updated, the transaction amounts including the PayPal fee, any discounts, insurance, the transaction status, and other information about the transaction.
    payer_info. The payer information. Includes the PayPal customer account ID and the payer's email address, primary phone number, name, country code, address, and whether the payer is verified or unverified.
    shipping_info. The shipping information. Includes the recipient's name, the shipping method for this order, the shipping address for this order, and the secondary address associated with this order.
    auction_info. The auction information. Includes the name of the auction site, the auction site URL, the ID of the customer who makes the purchase in the auction, and the date and time when the auction closes.
    cart_info. The cart information. Includes an array of item details, whether the item amount or the shipping amount already includes tax, and the ID of the invoice for PayPal-generated invoices.
    incentive_info. An array of incentive detail objects. Each object includes the incentive, such as a special offer or coupon, the incentive amount, and the incentive program code that identifies a merchant loyalty or incentive program.
    store_info. The store information. Includes the ID of the merchant store and the terminal ID for the checkout stand in the merchant store.

 * page integer
    The zero-relative start index of the entire list of items that are returned in the response. So, the combination of page=1 and page_size=20 returns the first 20 items.
    Minimum value: 1.
    Maximum value: 2147483647.
    
 * page_size integer
    The number of items to return in the response. So, the combination of page=1 and page_size=20 returns the first 20 items. The combination of page=2 and page_size=20 returns the next 20 items.
    Minimum value: 1.
    Maximum value: 500. 
 */
function subscription() {
    var baseURL = '/v1/reporting/transactions';

    var ret = {
        baseURL: baseURL,

        /**
         * Search for transactions within a billing subscription
         * @param  {Date}   startDate  start time of range of transactions to list
         * @param  {Date}   endDate   end time of range of transactions to list
         * @param  {Object}   config     Configuration parameters e.g. client_id, client_secret override
         * @return {Object}              subscription transaction list, array of subscription transaction objects
         */
        list: async function list(startDate, endDate, _page, _page_size, config) {
            let data = {
                start_date: startDate.toISOString(),
                end_date: endDate.toISOString(),
                // fields: "all",
                fields: "transaction_info,payer_info,shipping_info",
                page:_page,
                page_size:_page_size,
            };
            return await api.executeAsync('GET', baseURL , data, config);
        },
    };
    return ret;
}
module.exports = subscription;
