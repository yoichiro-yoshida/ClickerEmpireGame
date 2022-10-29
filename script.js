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

class View{
    static startPage(){
        config.initialForm.classList.add("d-flex", "justify-content-center", "align-items-center", "vh-100");
        config.initialForm.innerHTML = 
        `
        <div class="bg-white d-flex justify-content-center align-items-center">
            <div  class="col-12 text-center p-2">
                <h1 id="test" class="pb-3">Click Empire Game</h1>
                <form id="user-form">
                    <input type="text" placeholder="Your name">
                </form>
                <div class="d-flex justify-content-between my-3">
                    <div class="col-6 pe-1">
                        <button type="submit" id="newGame" class="btn btn-primary col-8">New</button>
                    </div>
                    <div class="col-6 ps-1">
                        <button type="submit" id="loadGame" class="btn btn-primary col-8">Load</button >
                    </div>
                </div>
            </div>
        </div>
        `;



    }

    static mainGamePage(user){
        let baseContainer = document.createElement("div");
        baseContainer.classList.add("d-flex","justify-content-center","text-white","p-md-5","pb-5","vh-100")
    
        let gameContainer = document.createElement("div");
        gameContainer.classList.add("bg-blue","p-2","d-flex","col-md-11","col-lg-10");
        // 画面左部分
        let leftCon = document.createElement("div");
        leftCon.classList.add("bg-dark","p-2","col-4");
        let bargerCon = document.createElement("div");
        
        let countBargerCon = document.createElement("div");
        countBargerCon.classList.add("bg-blue","text-center","countBargerCon");

        let iconBargerCon = document.createElement("div");
        
        countBargerCon.append(View.countBargerCon(user));
        iconBargerCon.append(View.iconBargerCon(user));

        bargerCon.append(countBargerCon, iconBargerCon);
        
        leftCon.append(bargerCon);


        // 画面右部分
        let rightCon = document.createElement("div");
        rightCon.classList.add("m-1","p-1","row","col-8");

        let statusCon = document.createElement("div");
        statusCon.classList.add("bg-dark","text-center","statusCon");
        statusCon.append(View.createStatusCon(user));


        let itemCon = document.createElement("div");
        itemCon.classList.add("bg-dark","mt-2","p-1","overflow-scroll","h-80");
        itemCon.append(View.createItemList(user));

        


        rightCon.append(statusCon,itemCon,View.createSaveReset(user));

        gameContainer.append(leftCon,rightCon);
        baseContainer.append(gameContainer);

        return baseContainer;
    }

    static createSaveReset(user){
        let container = document.createElement("div");
        container.innerHTML +=
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

        let resetBtn = container.querySelectorAll("#reset")[0];
        resetBtn.addEventListener("click", function(){
            Controler.resetAllData(user);

        });

        let saveBtn = container.querySelectorAll("#save")[0];
        saveBtn.addEventListener("click", function(){
            Controler.stoptimer();
            Controler.saveUserDate(user);
            Controler.initializePage();
        });

        

        return container;
    }

    static createStatusCon(user){
        let container = document.createElement("div");
        container.innerHTML = 
        `
        <div class="row">
            <div class="bg-blue m-1 p-1 col">
                <p>${user.name}</p>
            </div>
            <div class="bg-blue m-1 p-1 col">
                <p>${user.age} years old</p>
            </div>
        </div>
        <div class="row">
            <div class="bg-blue m-1 p-1 col">
                <p>${user.days}</p>
        </div>
            <div class="bg-blue m-1 p-1 col">
                <p>${user.money.toLocaleString()}</p>
            </div>
        </div>
        `;

        return container;
    }

    static createItemList(user){
        
        let itemListCon = document.createElement("div");
        for(let i = 0; i < user.items.length; i++){
            itemListCon.innerHTML +=
            `
            <div class="bg-blue m-1 hover d-sm-flex align-items-center" id="selectItem">
                <div class="col-sm-3" id="itemIcon">
                    <img src="${user.items[i].url}" class="img-fluid"> 
                </div>
                <div class="col-sm-9">
                    <div class="d-flex justify-content-between px-3"> 
                        <h4>${user.items[i].name}</h4>
                        <h4>${user.items[i].currentAmount.toLocaleString()}</h4>
                        </div>
                    <div class="d-flex justify-content-between px-3"> 
                        <p>￥${user.items[i].price.toLocaleString()}</p>
                        <p class="text-success">Get ${Controler.desplayItemsIncome(user.items[i], user.items[i].type)}</p>
                    </div>
                </div>
            </div>
            `
        }

        let selectedItem = itemListCon.querySelectorAll("#selectItem");

        for(let i=0; i < selectedItem.length; i++){
            selectedItem[i].addEventListener("click",function(){
                itemListCon.innerHTML = '';
                itemListCon.append(View.createViewItemInfoCon(user,i));
            });
        }

        return itemListCon;
    }

    static countBargerCon(user){
        let container = document.createElement("div");
        container.innerHTML =
        `
        <h4>${user.clickCount} Burtger</h4>
        <p>one click ￥${user.incomePerClick}</p>
        `;
        return container;
    }

    static iconBargerCon(user){
        let container = document.createElement("div");
        container.classList.add("p-2","pt-5","d-flex","justify-content-center");
        container.innerHTML =
        `
        <img src="https://cdn.pixabay.com/photo/2014/04/02/17/00/burger-307648_960_720.png" width=80% class="py-2 img-fuid hover" id="clickBarger">
        `

        let clickBarger = container.querySelectorAll("#clickBarger")[0];
        clickBarger.addEventListener("click",function(){
            Controler.updateCountByClick(user);
        })

        return container;

    }

    static createViewItemInfoCon(user, index){
        
        let viewItemInfoCon = document.createElement("div");
        viewItemInfoCon.classList.add("bg-blue","text-white");
        viewItemInfoCon.innerHTML +=
        `
            <div class="d-flex justify-content-between align-items-center">
                <div class="p-2">
                    <h3>${user.items[index].name}</h3>
                    <p>Max Parchases: ${View.maxAmountCon(user.items[index].maxAmount)}</p>
                    <p>Price: ${user.items[index].price}</p>
                    <p>Get ${Controler.desplayItemsIncome(user.items[index], user.items[index].type)}</p>
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
                <button class="btn btn-outline-primary text-primary col-5 bg-light" id="backBtn">Back</button>
                <button class="btn btn-primary col-5" id="purchaseBtn">Purchase</button>

            </di>
        `

        let inputCount = viewItemInfoCon.querySelectorAll("input")[0];

        inputCount.addEventListener("input", function(){
            viewItemInfoCon.querySelectorAll("#totalPrice")[0].innerHTML = 
            `
            total: ￥${Controler.totalPrice(user,index,parseInt(inputCount.value)).toLocaleString()}
            `
        });

        let backBtn = viewItemInfoCon.querySelectorAll("#backBtn")[0];
        backBtn.addEventListener("click", function(){
            View.updateMainGamePage(user);
        });

        let parchasesBtn = viewItemInfoCon.querySelectorAll("#purchaseBtn")[0];
        parchasesBtn.addEventListener("click", function(){
            Controler.parchaseItem(user,index,parseInt(inputCount.value));
            View.updateMainGamePage(user);
        })

        return viewItemInfoCon;
    }

    static updateMainGamePage(user){
        config.gamePage.innerHTML="";
        config.gamePage.append(View.mainGamePage(user));
    }

    static updateStatusCon(user){
        let container = config.gamePage.querySelectorAll(".statusCon")[0];
        container.innerHTML = "";
        container.append(View.createStatusCon(user));
    }

    static updateCountByClickCon(user){
        let contaner = config.gamePage.querySelectorAll(".countBargerCon")[0];
        contaner.innerHTML = "";
        contaner.append(View.countBargerCon(user));
    }

    static maxAmountCon(maxAmount){
        if(maxAmount == -1)return "∞";
        return maxAmount
    }
}

class Controler{
    timer;

    static createUserAccount(userName){
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
            return new User(userName, 20, 350, 1000000000000000, itemsList);
        }else{
            return new User(userName, 20, 0, 50000, itemsList);
        }
    }

    static getLoadUserData(userName){
        return JSON.parse(localStorage.getItem(userName));
    }

    static gameStart(){
        View.startPage()
        
        let newGameBtn = config.initialForm.querySelectorAll("#newGame")[0];
        newGameBtn.addEventListener("click",function(){
            let userName = config.initialForm.querySelectorAll("input")[0].value;
            if(userName == ""){
                return alert("please put your name")
            }else{
                let user = Controler.createUserAccount(userName);
                Controler.moveFromStartToMain(user);
            }
        })
    
        let loadGameBtn = config.initialForm.querySelectorAll("#loadGame")[0];
        loadGameBtn.addEventListener("click",function(){
            let userName = config.initialForm.querySelectorAll("input")[0].value;
    
            if(userName == ""){
                return alert("please put your name");
            }else{
                let user = Controler.getLoadUserData(userName);
                if(user == null) return alert("this user is no exist");
                else Controler.moveFromStartToMain(user);
            }
        })
    }

    static moveFromStartToMain(user){
        config.initialForm.classList.add("d-none");
        config.gamePage.append(View.mainGamePage(user));
        Controler.startTimer(user);

    }

    static desplayItemsIncome(userItems,type){
        if(type == "nomal")return userItems.perMoney.toLocaleString() + "/click";
        else if (type == "invest")return userItems.perRate.toLocaleString() + "/sec";
        else return userItems.perMoney.toLocaleString() +"/sec";
    }

    

    static startTimer(user){
        Controler.timer = setInterval(function(){
            user.days++;
            user.money += user.incomePerSec;
            if(user.days % 365 == 0){
                user.age++;
                View.updateStatusCon(user);
            }else{
                View.updateStatusCon(user);
            }
        },1000)
    }

    static stoptimer(){
        clearInterval(Controler.timer);
    }

    static updateCountByClick(user){
        user.clickCount++;
        console.log(user.money);
        console.log(user.incomePerClick);

        console.log(user.money + user.incomePerClick);

        user.money += user.incomePerClick;
        View.updateCountByClickCon(user);
        View.updateStatusCon(user);

    }

    static parchaseItem(user,index,count){
        if(count<=0 || count%1!=0){
            alert("有効な数値ではありません。");
        }else if(user.money < user.items[index].price * count){
            alert("お金が足りません。");
        }else if(user.items[index].currentAmount + count > user.items[index].maxAmount && user.items[index].type != "invest"){
            alert("アイテムの購入量の最大値を超えています。");
        }else{
            user.money -= Controler.totalPrice(user,index,count);
            user.items[index].currentAmount += Number(count);
            Controler.updateIncome(user, index, count);
            Controler.addETFStock(user,index,count);
        }
    }

    static updateIncome(user, index, count){
        if(user.items[index].type == "nomal"){
            user.incomePerClick += user.items[index].perMoney * count;
        }else if(user.items[index].type == "estate"){
            user.incomePerSec += user.items[index].perMoney * count;
        }else if(user.items[index].type == "invest"){
            user.incomePerSec += user.stock * user.items[index].perRate;
        }
    }

    static addETFStock(user,index,count){
        if(user.items[index].type == "invest"){
            if(user.items[index].name == "ETF Stock"){
                user.stock += Controler.totalPrice(user,index,count);
                user.items[index].price = Controler.getETFStockPrice(user,index,count);
            }else if(user.items[index].name == "ETF Bonds"){
                user.stock += Controler.totalPrice(user,index,count);
            }
        }
    }

    static totalPrice(user,index,count){
        let total = 0;
        count = Number(count);
        if(user.items[index].name == "ETF Stock"){
           for(let i = 0; i < count; i++){
            total += parseInt(user.items[index].price * Math.pow(1 + user.items[index].perRate,i));
           }
           return total;
        }else if(count > 0 && count % 1 == 0){
            total += count * user.items[index].price;
            return total;
        }
        else return total;
    }

    static getETFStockPrice(user,index,count){
        return parseInt(user.items[index].price * Math.pow(1 + user.items[index].perRate, count));
    }

    static resetAllData(user){
        if(window.confirm("Reset All Data?")){
            let userName = user.name;
            user = Controler.createUserAccount(userName);
            Controler.stoptimer();
            View.updateMainGamePage(user);
            Controler.startTimer(user);
        }
    }

    static saveUserDate(user){
        localStorage.setItem(user.name, JSON.stringify(user));
        alert("Saved your data. Please put the same name when you login.");
    }

    static initializePage(){
        config.initialForm.classList.remove("d-none")
        config.initialForm.innerHTML = "";
        config.gamePage.innerHTML = "";
        Controler.gameStart();
    }
}

Controler.gameStart();
