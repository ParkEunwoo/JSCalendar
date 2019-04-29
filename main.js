const Dates = document.querySelector('.cal_body');
const Year = document.querySelector('.year');
const Month = document.querySelector('.month');

const thisMonth = {
    year: null,
    month: null
}

const getToday = () => {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    thisMonth.year = year;
    thisMonth.month = month;
}

const showMonth = (this_month) => {
    const year = this_month.year;
    const month = this_month.month;
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    Year.innerHTML = year;
    Month.innerHTML = months[month];
    Dates.innerHTML = '';
    days.map((value)=>{
        Dates.innerHTML += `<div class="day">${value}</div>`;
    })
    const t_month = new Date(year, month);
    const end = new Date(year, month+1, 0);
    
    const start_day = t_month.getDay();
    const end_day = end.getDay();
    const end_date = end.getDate();
    
    const pre = new Array(start_day).fill('');
    const post = new Array(6 - end_day).fill('');
    const t_mon = new Array(end_date).fill('');
    
    const d = [...pre, 
    ...t_mon.map(function(value, index){
        return index+1;
    } ),
    ...post
    ]
    
    d.map(function(value){
        Dates.innerHTML += `<div class="date">${value}</div>`;
        return ;
    })
    
}
const preMonth = () => {
    if(thisMonth.month==0){
        thisMonth.month=11;
        thisMonth.year--;
    }
    else{
        thisMonth.month--;
    }
    showMonth(thisMonth);
}
const postMonth = () => {
    if(thisMonth.month==11){
        thisMonth.month=0;
        thisMonth.year++;
    }
    else{
        thisMonth.month++;
    }
    showMonth(thisMonth);
}

window.onload = () => {
    getToday();
    console.log(thisMonth);
    showMonth(thisMonth);
}
