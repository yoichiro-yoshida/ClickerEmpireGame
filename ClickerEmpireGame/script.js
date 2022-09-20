

const itemList = [
    {
        "itemName":"Flip machine",
        "itemType":"nomal",
        "itemMaxBuy":500,
        "itemDescription":"￥25/click",
        "itemValue":15000,
        "itemImage":"https://cdn.pixabay.com/photo/2019/06/30/20/09/grill-4308709_960_720.png"
    },
    {
        "itemName":"ETF Stock",
        "itemType":"invest",
        "itemMaxBuy":-1,
        "itemDescription":"￥0.1/sec",
        "itemValue":300000,
        "itemImage":"https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png"
    },
    {
        "itemName":"ETF Bonds",
        "itemType":"invest",
        "itemMaxBuy":-1,
        "itemDescription":"￥0.07/sec",
        "itemValue":300000,
        "itemImage":"https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png"
    },
    {
        "itemName":"Lemonade Stand",
        "itemType":"estate",
        "itemMaxBuy":1000,
        "itemDescription":"￥30/sec",
        "itemValue":30000,
        "itemImage":"https://cdn.pixabay.com/photo/2012/04/15/20/36/juice-35236_960_720.png"
    },
    {
        "itemName":"Ice Cream Truck",
        "itemType":"estate",
        "itemMaxBuy":500,
        "itemDescription":"￥120/sec",
        "itemValue":30000,
        "itemImage":"https://cdn.pixabay.com/photo/2020/01/30/12/37/ice-cream-4805333_960_720.png"
    },
    {
        "itemName":"House",
        "itemType":"estate",
        "itemMaxBuy":100,
        "itemDescription":"￥32,000/sec",
        "itemValue":20000000,
        "itemImage":"https://cdn.pixabay.com/photo/2016/03/31/18/42/home-1294564_960_720.png"
    },
    {
        "itemName":"TownHouse",
        "itemType":"estate",
        "itemMaxBuy":100,
        "itemDescription":"￥64,000/sec",
        "itemValue":40000000,
        "itemImage":"https://cdn.pixabay.com/photo/2019/06/15/22/30/modern-house-4276598_960_720.png"
    },
    {
        "itemName":"Mansion",
        "itemType":"estate",
        "itemMaxBuy":20,
        "itemDescription":"￥500,000/sec",
        "itemValue":250000000,
        "itemImage":"https://cdn.pixabay.com/photo/2017/10/30/20/52/condominium-2903520_960_720.png"
    },
    {
        "itemName":"Industrial Space",
        "itemType":"estate",
        "itemMaxBuy":10,
        "itemDescription":"2,200,000/sec",
        "itemValue":1000000000,
        "itemImage":"https://cdn.pixabay.com/photo/2012/05/07/17/35/factory-48781_960_720.png"
    },
    {
        "itemName":"Hotel Skyscraper",
        "itemType":"estate",
        "itemMaxBuy":5,
        "itemDescription":"25,000,000/sec",
        "itemValue":10000000000,
        "itemImage":"https://cdn.pixabay.com/photo/2012/05/07/18/03/skyscrapers-48853_960_720.png"
    },
    {
        "itemName":"Bullet-Speed Sky Railway",
        "itemType":"estate",
        "itemMaxBuy":1,
        "itemDescription":"30,000,000,000/sec",
        "itemValue":10000000000000,
        "itemImage":"https://cdn.pixabay.com/photo/2013/07/13/10/21/train-157027_960_720.png"
    }
]

function test(){
    let testEle = document.getElementById("test");
    testEle.innerHTML += " test";
}

const config = {
    initialForm: document.getElementById("initial-form"),
    gamePage:document.getElementById("game-page")
}

class UserAccount{
    constructor(userName){
        this.userName = userName;
    }
}

class item{
    constructor(name,type,maxBuy,description,value){
        this.name = name;
        this.type = type;
        this.maxBuy = maxBuy;
        this.description = description;
        this.value = value;
    }
}

function initializeUserAccount(){
    // const form = document.getElementById("user-form");
    // let userAccount = new UserAccount(
    //     form.querySelectorAll(`input[name=user-name]`).item[0].value
        
    // );

    // console.log(form.querySelectorAll(`input[name=user-name]`).item[0].value);
    config.initialForm.classList.add("d-none");
    config.gamePage.classList.add("d-block");
    config.gamePage.append(mainGamePage());
}

function mainGamePage(){

    let baseContainer = document.createElement("div");
    baseContainer.classList.add("d-flex","justify-content-center","text-white","p-md-5","pb-5","vh-100")
    console.log(baseContainer);

    let gameContainer = document.createElement("div");
    gameContainer.classList.add("bg-blue","p-2","d-flex","col-md-11","col=lg-10");



    // 左側画面
    let leftCon = document.createElement("div");
    leftCon.classList.add("bg-dark","p-2","col-4");
    let bargerCon = document.createElement("div");
    
    let countBargerCon = document.createElement("div");
    countBargerCon.classList.add("bg-blue","text-center");

    countBargerCon.innerHTML =
    `
    <h4 class="">41 Burgers</h4>
    <p>one click ￥50</p>
    `;


    let iconBargerCon = document.createElement("div");
    iconBargerCon.classList.add("p-2","pt-5","d-flex","justify-content-center");
    iconBargerCon.innerHTML+=
    `
        <img src="https://cdn.pixabay.com/photo/2014/04/02/17/00/burger-307648_960_720.png" width="80%" class="img-fluid hover" >
    `

    bargerCon.append(countBargerCon,iconBargerCon);
    
    leftCon.append(bargerCon);
    

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
    nameString.innerHTML="test_user";
    nameCon.append(nameString)


    let yearsCon = document.createElement("div");
    yearsCon.classList.add("bg-blue","m-1","p-1","col");
    let yearsString = document.createElement("p");
    yearsString.innerHTML="25 years old";
    yearsCon.append(yearsString)
    retsu1.append(nameCon,yearsCon);


    let retsu2 = document.createElement("div");
    retsu2.classList.add("row");


    let daysCon = document.createElement("div");
    daysCon.classList.add("bg-blue","m-1","p-1","col");

    let dayssString = document.createElement("p");
    dayssString.innerHTML="50 days";
    daysCon.append(dayssString)


    let amountCon = document.createElement("div");
    amountCon.classList.add("bg-blue","m-1","p-1","col");
    let amountString = document.createElement("p");
    amountString.innerHTML="￥40000";
    amountCon.append(amountString)


    retsu2.append(daysCon,amountCon);
    statusCon.append(retsu1,retsu2);


    let itemListCon = document.createElement("div");
    itemListCon.classList.add("bg-dark","mt-2","p-1","overflow-scroll","h-80");

    function createItemList(itemListCon){
        for(let i = 0;i < itemList.length;i++){
            itemListCon.innerHTML+=
            `
            <div class="bg-blue m-1 hover d-sm-flex align-items-center">
                
                    <div class="col-sm-3">
                        <img src="${itemList[i].itemImage}" class="img-fluid"> 
                    </div>
                    <div class="col-sm-9">
                        <div class="d-flex justify-content-between"> 
                            <h4>${itemList[i].itemName}</h4>
                            <h4>0</h4>
                        </div>
                        <div class="d-flex justify-content-between"> 
                            <p>￥${itemList[i].itemValue.toLocaleString()}</p>
                            <p class="text-success">${itemList[i].itemDescription}</p>
                        </div>
                    </div>
                
            </div>
            `
        }
    }

    createItemList(itemListCon);


    rightContainer.append(statusCon,itemListCon);
    



    gameContainer.append(leftCon,rightContainer);
    baseContainer.append(gameContainer);
    
    return baseContainer;
    
}


