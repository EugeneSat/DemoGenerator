
const input = document.getElementById('input');
const grid = document.getElementsByClassName('grid')[0];
const btn = document.getElementById('btn');
const clickLoadImg = document.getElementById('loadImage');
const img = document.querySelectorAll('.img');
const error = document.querySelector('.nav_error');
const errorTxt = document.querySelector('.errorTxt');

//при загрузке страницы выполняется функция смены цвета по времени суток
window.addEventListener('load', dayNightMode);



//При нажатии кнопки интер при вводе в инпут запускается функция
input.addEventListener('keydown', (event) => {

  if(event.key === 'Enter'){
    if (input.value == '') {
       errorTxt.style.display = 'block';
    }
    else{
       loadImg();
    }



    }
})
btn.addEventListener('click', ()=> {

  if (input.value == '') {
     errorTxt.style.display = 'block';
  }
  else{
       loadImg();
  }



})

function loadImg() {
  //удаляем прошлые картинки , что занимают страницу
    removeImg();
 //обращаемся к сайту с картинками через API
    const url = 'https://api.unsplash.com/search/photos?query=' + input.value + '&per_page=9&client_id=Qxh7_udD9WNpg8_cACGwhDI3c2eKmSfOrtsBZL1hwGA';


    fetch(url)

    .then(response =>{
      if (response.ok) {
        return response.json();
      }
      else {
        alert(response.status)
      }
    })

//когда ответ на запрос поступил
    .then(data => {
      //объявляем переменную, как массив
      const imgNodes = [];
      //Добавляем кнопку скачивания
      const loadClick = '<button class="loadClick" id="loadImage"><a href="img/Картинка.png" download>Скачать</a></button>';
      //создаем цикл для вывода картинок на сайте
      for (let i = 0; i < data.results.length; i++) {
        //создаем див
        imgNodes[i] = document.createElement('div');
        // присваиваем ему класс
          imgNodes[i].className = 'img';

             imgNodes[i].innerHTML = loadClick;
          // не знаю, пока не понял
            imgNodes[i].style.backgroundImage = 'url(' + data.results[i].urls.raw+')' ;
          // при двойном клике, картинка в полном размере появляется в новой вкладке
            imgNodes[i].addEventListener('dblclick', ()=>{
              window.open(data.results[i].links.download,'_blank');

            })



            grid.appendChild(imgNodes[i]);
      }
    })
}

//функция удаления прошлых картинок перед загрузкой новых картинок
function removeImg() {
    grid.innerHTML = '';
    errorTxt.style.display = 'none';

}

// функция смены цвета в зависимости от времени суток
function dayNightMode() {
   const date = new Date();
   const hour = date.getHours();

   if (hour >= 7 && hour <= 19) {
     document.body.style.backgroundColor = '#DEE8D3';
     document.body.style.color = '#A0CDB8';
   }
   else {
      document.body.style.backgroundColor = '#A0CDB8';
      document.body.style.color = '#DEE8D3';
   }
}


//функция, если при пустом инпуте или апи не находит картинку, то всплывает надпись
function navError(){

   //error.innerHTML = errorTxt;
   //errorTxt.style.display = 'block';
}
