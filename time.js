const getData = () => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "get",
      "https://cors-anywhere.herokuapp.com/https://time.com/",
      true
    );
    xhr.responseType = "document";
    const result = [];
    xhr.onload = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var res = xhr.responseXML.querySelectorAll(".most-popular-feed__item");
        res.forEach((ele) => {
          const link =
            "https://time.com" +
            ele.childNodes[3].href.split("herokuapp.com")[1];
          const title = ele.childNodes[3].childNodes[1].innerText;

          result.push({ title, link });
        });
      }
      resolve(result);
    };

    xhr.onerror = function () {
      reject({ status: xhr.status, error: xhr.statusText });
    };

    xhr.send();
  });
};

getData().then((res) => {
  console.log(res);
});