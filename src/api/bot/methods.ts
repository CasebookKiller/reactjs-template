/**
 * Sends a POST request to the specified Telegram Bot API method with the provided request body.
 *
 * @param {string} method - The Telegram Bot API method to call.
 * @param {string} request - The JSON stringified request body to be sent in the POST request.
 * @param {function} onSuccess - Callback function to be executed on a successful response.
 *        Receives an object containing the response payload.
 * @param {function} onError - Callback function to be executed if an error occurs.
 *        Receives an object containing the error details.
 */
export function fetchBot(
  method: string,
  request: string,
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) {
  console.log('method: ', method);
  fetch(
    `https://api.telegram.org/bot${import.meta.env.VITE_BOT_TOKEN}/` + method, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache"
    },
    body: request
  })
  .then(response => {
    return response.json();
  })
  .then(response => {
    onSuccess({ status: 'done', payload: response });
  })
  .catch(error => {
    onError({ status: 'error', error });
  });
}

export function fetchBotFormData(
  method: string,
  request: FormData,
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) {
  console.log('method: ', method);
  console.log('request: ', request);

  fetch(`https://api.telegram.org/bot${import.meta.env.VITE_BOT_TOKEN}/${method}`, {
    method: 'POST',
    body: request
  })
    .then(response => response.json())
    .then(response => onSuccess({ status: 'done', payload: response }))
    .catch(error => onError({ status: 'error', error }));
}

/**
 * Sends a request to the Telegram Bot API.
 *
 * If the request is a string, it will be sent as a JSON payload.
 * If the request is a FormData, it will be sent as a multipart/form-data payload.
 *
 * @param {string} method The method to call on the Telegram Bot API.
 * @param {string | FormData} request The request to send to the Telegram Bot API.
 * @returns {Promise} A promise that resolves with the response from the Telegram Bot API.
 */
export function botMethod(
  method: string,
  request: string | FormData
) {
  return new Promise(function (resolve, reject) {
    if (typeof request === 'string') {
      fetchBot(
        method,
        request,
        function (result) {
          resolve(result)
        },
        function (error) {
          reject(error)
        }
      );
    } else if (typeof request === 'object') {
      console.log('request: ', typeof(request));
      fetchBotFormData(
        method,
        request,
        function (result) {
          resolve(result)
        },
        function (error) {
          reject(error)
        }
      );
    }
  });
}

/*
sendMessage
-----------
Use this method to send text messages. On success, the sent Message is returned.

Parameter                   Type                    Required    Description
---------------------------------------------------------------------------
business_connection_id      String                  Optional	  Unique identifier of the business connection on behalf of which the message will be sent
chat_id                     Integer or String       Yes         Unique identifier for the target chat or username of the target channel (in the format @channelusername)
message_thread_id           Integer                 Optional    Unique identifier for the target message thread (topic) of the forum; for forum supergroups only
text                        String                  Yes         Text of the message to be sent, 1-4096 characters after entities parsing
parse_mode                  String                  Optional    Mode for parsing entities in the message text. See formatting options for more details.
entities                    Array of MessageEntity  Optional    A JSON-serialized list of special entities that appear in message text, which can be specified instead of parse_mode
link_preview_options        LinkPreviewOptions      Optional    Link preview generation options for the message
disable_notification        Boolean                 Optional    Sends the message silently. Users will receive a notification with no sound.
protect_content             Boolean                 Optional    Protects the contents of the sent message from forwarding and saving
allow_paid_broadcast        Boolean                 Optional    Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance
message_effect_id           String                  Optional    Unique identifier of the message effect to be added to the message; for private chats only
reply_parameters            ReplyParameters         Optional    Description of the message to reply to
reply_markup                InlineKeyboardMarkup or
                            ReplyKeyboardMarkup or
                            ReplyKeyboardRemove or
                            ForceReply              Optional    Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user
*/


/**
 * Use this method to send text messages. On success, the sent Message is returned.
 * @param {string} request The JSON stringified request body.
 * @return {Promise} A Promise that resolves with the response, or rejects with any error.
 */
export function sendMessage(
  request: string
) {
  return new Promise(function (resolve, reject) {
    fetchBot(
      'sendMessage',
      request,
      function (result) {
        resolve(result)
      },
      function (error) {
        reject(error)
      }
    );
  });
}

/*
sendPhoto
---------
Use this method to send photos. On success, the sent Message is returned.

Parameter                   Type                    Required    Description
---------------------------------------------------------------------------
business_connection_id      String                  Optional    Unique identifier of the business connection on behalf of which the message will be sent
chat_id                     Integer or String       Yes         Unique identifier for the target chat or username of the target channel (in the format @channelusername)
message_thread_id           Integer                 Optional    Unique identifier for the target message thread (topic) of the forum; for forum supergroups only
photo                       InputFile or String     Yes         Photo to send. Pass a file_id as String to send a photo that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a photo from the Internet, or upload a new photo using multipart/form-data. The photo must be at most 10 MB in size. The photo's width and height must not exceed 10000 in total. Width and height ratio must be at most 20. More information on Sending Files »
caption                     String                  Optional    Photo caption (may also be used when resending photos by file_id), 0-1024 characters after entities parsing
parse_mode                  String                  Optional    Mode for parsing entities in the photo caption. See formatting options for more details.
caption_entities            Array of MessageEntity  Optional    A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode
show_caption_above_media    Boolean                 Optional    Pass True, if the caption must be shown above the message media
has_spoiler                 Boolean                 Optional    Pass True if the photo needs to be covered with a spoiler animation
disable_notification        Boolean                 Optional    Sends the message silently. Users will receive a notification with no sound.
protect_content             Boolean                 Optional	  Protects the contents of the sent message from forwarding and saving
allow_paid_broadcast        Boolean                 Optional	  Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance
message_effect_id           String                  Optional	  Unique identifier of the message effect to be added to the message; for private chats only
reply_parameters            ReplyParameters         Optional	  Description of the message to reply to
reply_markup                InlineKeyboardMarkup or
                            ReplyKeyboardMarkup or
                            ReplyKeyboardRemove or
                            ForceReply              Optional    Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user
*/

/**
 * Use this method to send photos. On success, the sent Message is returned.
 * @param {string} request The JSON stringified request body.
 * @return {Promise} A Promise that resolves with the response, or rejects with any error.
 */
export function sendPhoto(
  request: string
) {
  return new Promise(function (resolve, reject) {
    fetchBot(
      'sendPhoto',
      request,
      function (result) {
        resolve(result)
      },
      function (error) {
        reject(error)
      }
    );
  });
}