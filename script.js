let notificationContainer = document.querySelector('.container-notifications');
let button = document.querySelector('.btn-notifications');
let bubbleNotificationsContainer = document.querySelector('.buble-notification-container');

let apiArr = [

    {

        id: 1321,

        type: 'text',

        title: 'Test notification',

        text: 'Test text notification',

        expires: 3600

    },

    {

        id: 4322,

        type: 'bonus',

        title: 'You win a bonus!',

        requirement: 'Deposit $50 to win',

        expires: 3600

    },

    {

        id: 5453,

        type: 'Promotion',

        image: 'https://www.freeiconspng.com/uploads/leistungen-promotion-icon-png-0.png',

        title: '%30 off on sports betting',

        link: 'https://www.google.com/',

    },

    {

        id: 5236,

        type: 'text',

        title: 'Test notification',

        text: 'Test text notification',

        expires: 5

    }

];


let notificationsCount = 0;
let api = Array.from(apiArr);
api = api.reverse();
let arrPosition = [];
let arrTime = [];

//loop thru the array of objects
for (let i = 0; i < api.length; i++) {
    //loop thru each object
    for (let prop in api[i]) {
        //sort the values from each object and display only the needed information
        if (prop !== 'id' && prop !== 'type' && prop !== 'expires') {
            if (prop == 'image') {
                notificationContainer.innerHTML += `<div class="imgContainer" data-index=${i}><img src="${api[i][prop]}" /></div>`;
            } else if (prop == 'title') {
                notificationContainer.innerHTML += `<h3 data-index=${i} >${api[i][prop]}</h3>`;

            } else if (prop == 'link') {
                notificationContainer.innerHTML += `<a data-index=${i} target="_blank" href="${api[i][prop]}">link</a><hr data-index=${i}>`;

            } else {
                notificationContainer.innerHTML += `<div data-index=${i} >${api[i][prop]}</div> <hr data-index=${i}>`;
            }
        }

        //find the expiration time from each object
        if (Object.keys(api[i]).indexOf('expires') > -1) {
            //timer - deletes expired containers
            if (prop == 'expires') {
                //get the position to expired objects
                arrPosition.push(i);
                //get the seconds to expired objects
                arrTime.push(api[i][prop]);
                setTimeout(() => {
                    document.querySelectorAll(`[data-index="${i}"`).forEach(e => e.remove());
                }, `${api[i][prop]}`);

            }
        }
    }
    //counts the notifications without bonus
    if (!(Object.values(api[i]).indexOf('bonus') > -1)) {
        notificationsCount++;
    }
}

//Toggle dropdown menu 
button.addEventListener('click', () => {
    document.querySelector('.row-notifications').classList.toggle('remove-div');
    bubbleNotificationsContainer.remove();
})
//Tried to settimeout and remove the elements from the array with expire tag , but it didn't work out.
// for (let j = 0; j < arrTime.length; j++) {
//     setTimeout(() => {


//     }, arrTime[j]);
// }

//filters from objects in the array with expire tag
api = api.filter((value, ind) => {
    return arrPosition.indexOf(ind) == -1;
});

//add value to bubble notifications
bubbleNotificationsContainer.innerHTML = api.length;