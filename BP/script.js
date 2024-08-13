function loader() {
  document.addEventListener("DOMContentLoaded", function () {
      const tableBody = document.querySelector("#csvTable tbody");

      // Замените 'data.csv' на имя вашего CSV-файла
      fetch('modules_bp.csv')
          .then((response) => response.text())
          .then((data) => {
              const rows = data.trim().split('\n');
              rows.forEach((row) => {
                  const columns = row.split(';');
                  const text = columns[0];
                  const link1 = columns[1];
                  const link2 = columns[2];
                  const newRow = document.createElement('tr');

                // Избавление от пустих строк
                  var file_link = 'File link'
                  if (columns[2].length == 1 || columns[2].length == 0) {
                    file_link = ""
                  }
                  var text1 = text
                  if (columns[0].indexOf("MOD") != -1) {
                    var text1 = ''
                    file_link = ''
                    adderMod()
                    // adder()
                  } else if (text.length == 0 && link1.length == 0 && link2.length == 1) {
                    space()
                  } else {
                    adder()
                  }


                  function adderMod() {
                      newRow.innerHTML = `
                      <td class = "mod" title = "Модуль: ${text}">${text}</td>
                  `;
                  tableBody.appendChild(newRow);
                  }

                  function adder() {
                      newRow.innerHTML = `
                      <td><a href="${link1}" target="_blank" title = "Ссылка на видео: ${text}">${text}</a></td>
                      <td class = "file_links"><a href="${link2}" target="_blank" title = "Ссылка на файлы: ${link2}">${file_link}</a></td>
                  `;
                  tableBody.appendChild(newRow);
                  }

                  function space() {
                    console.log("Yep")
                      newRow.innerHTML = `
                  `;
                  tableBody.appendChild(newRow);
                  }

              });
          })
          .catch((error) => {
              console.error("Ошибка при загрузке CSV-файла:", error);
          });
  });
}

loader()

function sha256(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    return window.crypto.subtle.digest('SHA-256', data).then(arrayBuffer => {
        const hashArray = Array.from(new Uint8Array(arrayBuffer));
        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        return hashHex;
    });
}

// function passloader() {
//   return fetch('txt.txt')
//       .then(response => response.text())
//       .then(data => {
//           const passwordArray = data.split(';')
//           return passwordArray
//       })
//       .catch(error => {
//           console.error('Ошибка при загрузке файла:', error)
//           throw error
//       });
// }

// passloader()
//   .then(passwords => {
//       var userPassword = prompt("Пожалуйста, введите пароль для доступа:");
//       for (var i = 0; i < passwords.length; i++) {
//         for (var j = 0 ; j < passwords[i].length; j++) {
//           sha256(userPassword).then(hash => {
//             console.log(hash)
//             console.log(passwords[i])
//             if (hash === passwords[i]) {
//               console.log("Done")
//             }
//           })
//         }
//         // console.log(passwords[i])
//       }
//   })
//   .catch(error => {
//       // Обработка ошибки, если произошла ошибка при загрузке или обработке данных
//   });



// sha256('123').then(hash => {
//   if (hash === password) {
//     console.log("Done")
//   } else {
//     console.log("Not done")
//   }
// });







// var password = ['arch0007', 'passmark', 'firefall']

// for (var i = 0; i <= 2; i++) {
//   console.log(password[i])
//   sha256(password[i]).then(hash => {
//     console.log(hash)
//   })
// }