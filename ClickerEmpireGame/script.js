const config = {
    initialForm: document.getElementById("initial-form"),
    gamePage:document.getElementById("game-page")
}

class User{
    constructor(name,age,days,money,items){
        this.name = name;
        this.age = age;
        this.days = days;
        this.money = money;
        this.clickCount = 0;
        this.incomePerClick = 25;
        this.incomePerSec = 0;
        this.stock = 0;
        this.items = items;
    }
}

class Items{
    constructor(name,type,currentAmount,maxAmount,perMoney,perRate,price,url){
        this.name = name;
        this.type = type;
        this.currentAmount = currentAmount;
        this.maxAmount = maxAmount;
        this.perMoney = perMoney;
        this.perRate = perRate;
        this.price = price;
        this.url = url;
    }
}


function createUserAccount(userName){
    let itemsList = [
        new Items("Flip machine", "nomal", 0, 500, 25, 0, 15000, "https://cdn.pixabay.com/photo/2019/06/30/20/09/grill-4308709_960_720.png"),
        new Items("ETF Stock", "invest", 0, -1, 0, 0.1, 300000, "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png"),
        new Items("ETF Bonds", "invest", 0, -1, 0, 0.07,300000, "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png"),
        new Items("Lemonade Stand", "estate", 0, 1000, 30, 0, 30000, "https://cdn.pixabay.com/photo/2012/04/15/20/36/juice-35236_960_720.png"),
        new Items("Ice Cream Truck","estate", 0, 500, 120, 0, 30000, "https://cdn.pixabay.com/photo/2020/01/30/12/37/ice-cream-4805333_960_720.png"),
        new Items("House", "estate", 0, 100, 32000, 0, 20000000, "https://cdn.pixabay.com/photo/2016/03/31/18/42/home-1294564_960_720.png"),
        new Items("TownHouse", "estate", 0, 100, 64000, 0, 40000000, "https://cdn.pixabay.com/photo/2019/06/15/22/30/modern-house-4276598_960_720.png"),
        new Items("Mansion", "estate", 0, 20, 500000, 0, 250000000, "https://cdn.pixabay.com/photo/2017/10/30/20/52/condominium-2903520_960_720.png"),
        new Items("Industrial Space", "estate", 0, 10, 2200000, 0, 1000000000, "https://cdn.pixabay.com/photo/2012/05/07/17/35/factory-48781_960_720.png"),
        new Items("Hotel Skyscraper", "estate", 0, 5, 25000000, 0, 10000000000, "https://cdn.pixabay.com/photo/2012/05/07/18/03/skyscrapers-48853_960_720.png"),
        new Items("Bullet-Speed Sky Railway", "estate", 0, 1, 30000000000, 0, 10000000000000, "https://cdn.pixabay.com/photo/2013/07/13/10/21/train-157027_960_720.png")
    ]

    if(userName=="test1"){
        return new User(userName, 20, 350, 10000000000000000, itemsList);
    }else{
        return new User(userName, 20, 0, 50000, itemsList);
    }

    
}




function gameStart(){
    let newGameBtn = config.initialForm.querySelectorAll("#newGame")[0];
    newGameBtn.addEventListener("click",function(){
        let userName = config.initialForm.querySelectorAll("input")[0].value;
        // console.log(userName);
        if(userName == ""){
            return alert("please put your name")
        }else{
            let user = createUserAccount(userName);
            config.gamePage.append(mainGamePage(user));
            config.initialForm.classList.remove("d-block")
            config.initialForm.classList.add("d-none");
            config.gamePage.classList.remove("d-none");
            config.gamePage.classList.add("d-block");
        } 
    })

    let loadGameBtn = config.initialForm.querySelectorAll("#loadGame")[0];
    loadGameBtn.addEventListener("click",function(){
        let userName = config.initialForm.querySelectorAll("input")[0].value;

        if(userName == ""){
            return alert("please put your name");
        }else{
            let user = getLoadUserData(userName);
            // user = "test1";
            if(user == null){
                return alert("this user is no exist");
            }
            // console.log(userName);
            console.log(user);

            config.gamePage.append(mainGamePage(user));
            config.initialForm.classList.remove("d-block")
            config.initialForm.classList.add("d-none");
            config.gamePage.classList.remove("d-none");
            config.gamePage.classList.add("d-block");
        }
    })

    function getLoadUserData(userName){
        return JSON.parse(localStorage.getItem(userName));
    }
}



function mainGamePage(user){
    
    function startTimer(user){
        timer = setInterval(function(){
            user.days++;
            user.money += user.incomePerSec;
            updateCurrentAmount(user);
            if(user.days%365==0){
                user.age++;
                yearsString.innerHTML = user.age + " years old";
            }else{
                dayssString.innerHTML = user.days + " days";
            }
        },1000)
    }

    function stoptimer(){
        clearInterval(timer);
    }
    

    startTimer(user);

    let baseContainer = document.createElement("div");
    baseContainer.classList.add("d-flex","justify-content-center","text-white","p-md-5","pb-5","vh-100")
    // console.log(baseContainer);

    let gameContainer = document.createElement("div");
    gameContainer.classList.add("bg-blue","p-2","d-flex","col-md-11","col=lg-10");



    // 左側画面
    let leftCon = document.createElement("div");
    leftCon.classList.add("bg-dark","p-2","col-4");
    let bargerCon = document.createElement("div");
    
    let countBargerCon = document.createElement("div");
    countBargerCon.classList.add("bg-blue","text-center");

    function upadateCountBarger(user){
        countBargerCon.innerHTML =
        `
        <h4>${user.clickCount} Burtger</h4>
        <p>one click ￥${user.incomePerClick}</p>
        `;

    }
    upadateCountBarger(user);

    let iconBargerCon = document.createElement("div");
    iconBargerCon.classList.add("p-2","pt-5","d-flex","justify-content-center");
    iconBargerCon.innerHTML+=
    `
        <img src="https://cdn.pixabay.com/photo/2014/04/02/17/00/burger-307648_960_720.png" width="80%" class="img-fluid hover" id="clickBarger">
    `

    bargerCon.append(countBargerCon,iconBargerCon);
    
    leftCon.append(bargerCon);

    
    let bargerIcon = iconBargerCon.querySelectorAll("#clickBarger")[0];
    bargerIcon.addEventListener("click",function(){
        user.clickCount++;
        user.money += user.incomePerClick;
        countBargerCon.innerHTML = "";
        countBargerCon.innerHTML +=
        `
        <h4>${user.clickCount} Burtger</h4>
         <p>one click ￥${user.incomePerClick}</p>
        `;

        updateCurrentAmount(user);

        })
    
    

    // 右側画面
    let rightContainer = document.createElement("div");
    rightContainer.classList.add("m-1","p-1","row","col-8");

    let statusCon = document.createElement("div");
    statusCon.classList.add("bg-dark","text-center");

    let retsu1 = document.createElement("div");
    retsu1.classList.add("row");
    let nameCon = document.createElement("div");
    nameCon.classList.add("bg-blue","m-1","p-1","col");
    let nameString = document.createElement("p");
    nameString.innerHTML = user.name;
    nameCon.append(nameString)


    let yearsCon = document.createElement("div");
    yearsCon.classList.add("bg-blue","m-1","p-1","col");
    let yearsString = document.createElement("p");
    yearsString.innerHTML = user.age + " years old";
    yearsCon.append(yearsString)
    retsu1.append(nameCon,yearsCon);


    let retsu2 = document.createElement("div");
    retsu2.classList.add("row");


    let daysCon = document.createElement("div");
    daysCon.classList.add("bg-blue","m-1","p-1","col");

    let dayssString = document.createElement("p");
    dayssString.innerHTML = user.days + " days";
    daysCon.append(dayssString)


    let amountCon = document.createElement("div");
    amountCon.classList.add("bg-blue","m-1","p-1","col");
    let amountString = document.createElement("p");
    updateCurrentAmount(user);
    amountCon.append(amountString)


    retsu2.append(daysCon,amountCon);
    statusCon.append(retsu1,retsu2);


    let itemListCon = document.createElement("div");
    itemListCon.classList.add("bg-dark","mt-2","p-1","overflow-scroll","h-80");

    function createItemList(itemListCon,user){
        itemListCon.innerHTML="";
        itemListCon.innerHTML+=`<div id="itemLists">`
        for(let i = 0;i < user.items.length;i++){
            itemListCon.innerHTML+=
            `
            <div class="bg-blue m-1 hover d-sm-flex align-items-center selectItem">
               
                    <div class="col-sm-3" id="itemIcon">
                        <img src="${user.items[i].url}" class="img-fluid"> 
                    </div>
                    <div class="col-sm-9">
                        <div class="d-flex justify-content-between px-3"> 
                            <h4>${user.items[i].name}</h4>
                            <h4>${user.items[i].currentAmount}</h4>
                        </div>
                        <div class="d-flex justify-content-between px-3"> 
                            <p>￥${user.items[i].price.toLocaleString()}</p>
                            <p class="text-success">${desplayItemsIncome(user.items[i], user.items[i].type)}</p>
                        </div>
                    </div>
                
            </div>
            
            `
        }
        itemListCon.innerHTML+=`</div>`

        let select = itemListCon.querySelectorAll(".selectItem");
        
        // console.log(select[0]);

        for(let i=0; i < select.length; i++){
            select[i].addEventListener("click",function(){
                console.log(document.getElementById("#itemLists"));
                itemListCon.innerHTML = '';
                itemListCon.append(createViewItemInfoCon(user,i));
                
            });
        }
    }

    

    function desplayItemsIncome(userItems,type){

        if(type=="nomal")return userItems.perMoney.toLocaleString() + "/click"
        else if (type=="invest")return userItems.perRate.toLocaleString() + "/sec"
        else return userItems.perMoney.toLocaleString() +"/sec"
    }

    function createViewItemInfoCon(user, index){
        let viewItemInfoCon = document.createElement("div");
        viewItemInfoCon.classList.add("bg-blue","text-white");
        viewItemInfoCon.innerHTML +=
        `
            <div class="d-flex justify-content-between align-items-center">
                <div class="p-2">
                    <h3>${user.items[index].name}</h3>
                    <p>Max Parchases: ${user.items[index].maxAmount}</p>
                    <p>Price: ${user.items[index].price}</p>
                    <p>Get ${desplayItemsIncome(user.items[index], user.items[index].type)}</p>
                </div>
                <div class="d-sm-block col-sm-5 p-3">
                    <img src="${user.items[index].url}" class="img-fluid"> 
                </div>
            </div>
            <div class="p-2">
                
                <p>How many would you like to buy?</p>
                
                <div class="form-group">
                    <input type="number" placeholder="0" class="col-12 form-control"/>
                </div>
                <p class="d-flex justify-content-end" id="totalPrice">total: ￥0</p>
                
            </div>
            <div class="d-flex justify-content-between p-2">
                <button class="btn btn-outline-primary col-5 bg-light" id="backBtn">back</button>
                <button class="btn btn-primary col-5" id="purchaseBtn">purchase</button>

            </di>
        `

        let inputCount = viewItemInfoCon.querySelectorAll("input")[0];

        inputCount.addEventListener("input",function(){
            viewItemInfoCon.querySelectorAll("#totalPrice")[0].innerHTML = 
            `
            total: ￥${totalPrice(user,index,parseInt(inputCount.value)).toLocaleString()}
            `
        });


        let backBtn = viewItemInfoCon.querySelectorAll("#backBtn")[0];
        backBtn.addEventListener("click",function(){
            itemListCon.innerHTML="";
            createItemList(itemListCon,user);
        });

        let parchasesBtn = viewItemInfoCon.querySelectorAll("#purchaseBtn")[0];
        parchasesBtn.addEventListener("click",function(){
            
            itemListCon.innerHTML="";
            createItemList(itemListCon,user);
            parchasesItem(user,index,parseInt(inputCount.value));
        })

        return viewItemInfoCon;
    }

    function updateCurrentAmount(user){
        amountString.innerHTML = "￥" + user.money.toLocaleString();
    }

    function getETFStockPrice(user,index,count){
        return parseInt(user.items[index].price * Math.pow(1 + user.items[index].perRate, count));
    }

    function totalPrice(user,index,count){
        let total = 0;
        count = Number(count);
        if(user.items[index].name == "ETF Stock"){
           for(let i = 0; i < count; i++){
            total += parseInt(user.items[index].price * Math.pow(1 + user.items[index].perRate,i));
           }
           return total;
        }else if(count > 0 && count%1 == 0){
            total += count * user.items[index].price;
            return total;
        }
        else return total;
    }

    function addItemsAmmount(user,index,count){
        if(user.items[index].type == "nomal"){
            user.money -= totalPrice(user,index,count)
            updateCurrentAmount(user);
            user.incomePerClick += user.items[index].perMoney * count;
            upadateCountBarger(user);
        }else if(user.items[index].type == "estate"){
            user.incomePerSec += user.items[index].perMoney * count;
            user.money -= totalPrice(user,index,count)
            updateCurrentAmount(user);
        }else if(user.items[index].type == "invest"){
            user.money -= totalPrice(user,index,count);
            if(user.items[index].name == "ETF Stock"){
                user.stock += totalPrice(user,index,count);
                user.items[index].price = getETFStockPrice(user,index,count);
                user.incomePerSec += user.stock * user.items[index].perRate;
                updateCurrentAmount(user);
            }else if(user.items[index].name == "ETF Bonds"){
                user.stock += totalPrice(user,index,count);
                user.incomePerSec += user.stock * user.items[index].perRate;
                updateCurrentAmount(user);
            }
        }
    }

    function parchasesItem(user,index,count){
        if(count<=0 || count%1!=0){
            alert("有効な数値ではありません。");
        }else if(user.money < user.items[index].price * count){
            alert("お金が足りません。");
        }else if(user.items[index].currentAmount + count > user.items[index].maxAmount && user.items[index].type != "invest"){
            alert("アイテムの購入量の最大値を超えています。");
        }else{
            user.items[index].currentAmount += Number(count);
            addItemsAmmount(user,index,count);
            createItemList(itemListCon,user);
           
        }
    }

    let saveDeleteCon = document.createElement("div");
    saveDeleteCon.innerHTML+=
        `
        <div class="d-flex justify-content-end mt-2">
            <div class="border p-2 mr-2 hover" id="reset">
                <i class="fa fa-undo fa-2x text-white">
                </i>
            </div>
            <div class="border p-2 hover" id="save">
                <i class="fa fa-save fa-2x text-white"">
                </i>
            </div>
        </div>
        `

    let saveBtn = saveDeleteCon.querySelectorAll("#save")[0];
    saveBtn.addEventListener("click",function(){
        saveUserDate(user);
        stoptimer();
        config.gamePage.classList.remove("d-block")
        config.gamePage.classList.add("d-none");
        config.initialForm.classList.remove("d-none");
        config.initialForm.classList.add("d-block");

        ;
    })
    
    
    createItemList(itemListCon,user);
    rightContainer.append(statusCon,itemListCon,saveDeleteCon);
    gameContainer.append(leftCon,rightContainer);
    baseContainer.append(gameContainer);
    
    return baseContainer;

    function saveUserDate(user){
        localStorage.setItem(user.name, JSON.stringify(user));
        alert("Saved your data. Please put the same name when you login.");
    }
    
}


gameStart();
