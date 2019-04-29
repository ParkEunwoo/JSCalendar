const Pre = document.querySelector(".cal_body.pre");
const Dates = document.querySelector('.cal_body.now');
const Post = document.querySelector(".cal_body.post");
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

class Calendar {

    setArray(start_day, end_day, end_date){
        this.pre = new Array(start_day).fill('');
        this.post = new Array(6 - end_day).fill('');
        this.t_mon = new Array(end_date).fill('');
        return;
    }

    setRange(t_month, end){
        const start_day = t_month.getDay();
        const end_day = end.getDay();
        const end_date = end.getDate();

        this.setArray(start_day, end_day, end_date);
        return;
    }

    constructor(year, month){
        this.t_month = new Date(year, month);
        this.end = new Date(year, month+1, 0);

        this.setRange(this.t_month, this.end);
    }

    arrayCalendar() {
        return [...this.pre, 
            ...this.t_mon.map(function(value, index){
                return index+1;
            } ),
            ...this.post
            ];
    }
}

const setMonth = (this_month) => {
    const year = this_month.year;
    const month = this_month.month;
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    Year.innerHTML = year;
    Month.innerHTML = months[month];

    Pre.innerHTML = '';
    Dates.innerHTML = '';
    Post.innerHTML = '';

    days.forEach((value)=>{
        Pre.innerHTML += `<div class="day">${value}</div>`;
        Dates.innerHTML += `<div class="day">${value}</div>`;
        Post.innerHTML += `<div class="day">${value}</div>`;
    })

    const pre = new Calendar(year, month-1).arrayCalendar();
    const now = new Calendar(year, month).arrayCalendar();
    const post = new Calendar(year, month+1).arrayCalendar();
    
    pre.forEach(function(value){
        Pre.innerHTML += `<div class="date">${value}</div>`;
    })
    now.forEach(function(value){
        Dates.innerHTML += `<div class="date">${value}</div>`;
    })
    post.forEach(function(value){
        Post.innerHTML += `<div class="date">${value}</div>`;
    })
}

const changePre = (this_month) => {
    const year = this_month.year;
    const month = this_month.month;
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    Year.innerHTML = year;
    Month.innerHTML = months[month];

    Post.innerHTML = Dates.innerHTML;
    Dates.innerHTML = Pre.innerHTML;
    Pre.innerHTML = '';

    days.forEach((value)=>{
        Pre.innerHTML += `<div class="day">${value}</div>`;
    })

    const pre = new Calendar(year, month-1).arrayCalendar();

    pre.forEach(function(value){
        Pre.innerHTML += `<div class="date">${value}</div>`;
    })
    
    Pre.classList.remove("prein");
    Dates.classList.remove("preout");

}

const changePost = (this_month) => {
    const year = this_month.year;
    const month = this_month.month;
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    Year.innerHTML = year;
    Month.innerHTML = months[month];

    Pre.innerHTML = Dates.innerHTML;
    Dates.innerHTML = Post.innerHTML;
    Post.innerHTML = '';

    days.forEach((value)=>{
        Post.innerHTML += `<div class="day">${value}</div>`;
    })

    const post = new Calendar(year, month+1).arrayCalendar();

    post.forEach(function(value){
        Post.innerHTML += `<div class="date">${value}</div>`;
    })

    Post.classList.remove("postin");
    Dates.classList.remove("postout");

}

const preMonth = () => {
    if(thisMonth.month==0){
        thisMonth.month=11;
        thisMonth.year--;
    }
    else{
        thisMonth.month--;
    }
    Pre.classList.add("prein");
    Dates.classList.add("preout");
    window.setTimeout(()=>{changePre(thisMonth)}, 500);
}
const postMonth = () => {
    if(thisMonth.month==11){
        thisMonth.month=0;
        thisMonth.year++;
    }
    else{
        thisMonth.month++;
    }
    Post.classList.add("postin");
    Dates.classList.add("postout");
    window.setTimeout(()=>{changePost(thisMonth)}, 500);
}

window.onload = () => {
    getToday();
    setMonth(thisMonth);
}
