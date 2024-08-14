import http from "http";
import https from "https";

class HttpEase {
  constructor(baseURL = "") {
    this.baseURL = baseURL;
  }

  async request(method, url, data = null, headers = {}) {
    const isNode = typeof window === "undefined";
    const fullUrl = this.baseURL + url;

    if (isNode) {
      const parsedUrl = new URL(fullUrl);
      const protocol = parsedUrl.protocol === "https:" ? https : http;

      const options = {
        method: method,
        headers: headers,
      };

      return new Promise((resolve, reject) => {
        const req = protocol.request(parsedUrl, options, (res) => {
          let responseData = "";

          res.on("data", (chunk) => {
            responseData += chunk;
          });

          res.on("end", () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              try {
                resolve(JSON.parse(responseData));
              } catch (e) {
                resolve(responseData);
              }
            } else {
              reject(new Error(res.statusMessage));
            }
          });
        });

        req.on("error", (err) => {
          reject(err);
        });

        if (data) {
          req.write(JSON.stringify(data));
        }

        req.end();
      });
    } else {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, fullUrl);

        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key]);
        });

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              resolve(JSON.parse(xhr.responseText));
            } catch (e) {
              resolve(xhr.responseText);
            }
          } else {
            reject(new Error(xhr.statusText));
          }
        };

        xhr.onerror = () => reject(new Error("Network error"));

        if (data) {
          xhr.send(JSON.stringify(data));
        } else {
          xhr.send();
        }
      });
    }
  }

  get(url, headers = {}) {
    return this.request("GET", url, null, headers);
  }

  post(url, data, headers = {}) {
    return this.request("POST", url, data, headers);
  }

  put(url, data, headers = {}) {
    return this.request("PUT", url, data, headers);
  }
  patch(url, data, headers = {}) {
    return this.request("PUT", url, data, headers);
  }

  delete(url, headers = {}) {
    return this.request("DELETE", url, null, headers);
  }
}

export default HttpEase;
