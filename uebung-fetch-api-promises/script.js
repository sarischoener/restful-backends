"use strict";

"use strict";
// 1. Variable und fetche zu "https://...../api/..."
// 2. Variable .then((response) => {} = erster Promise --> bekommen die Response
// 3. response können wir den status prüfen
// 4. Aufrufen der json --> return response.json();--> liefert uns nächsten Promise
// 5. Jedes beliebige Api kann nun abgefragt werden

/* let p = fetch("https://krautipsum.com/api/noun"); // woher weiß ich was ich hinten eingeben will bzw. ob es das gibt
let p2 = p.then((response) => {
  //Erster Promise --> wir bekommen die Response

  console.log(response.status);
  console.log(response.ok);

  return response.json();
});
p2.then((data) => {
  console.log(data);
});
 */
//---> Der ursprüngliche Code
fetch("https://krautipsum.com/api/noun") // woher weiß ich was ich hinten eingeben will bzw. ob es das gibt
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data.noun);
    document.body.append(document.createTextNode(data.noun));
  });
