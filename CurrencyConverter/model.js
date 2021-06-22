'use strict';

class Model{
    saveData(){
        let Home = document.getElementById("HomePicture");
        let Visiting = document.getElementById("VisingPicture");
        let bankFee = document.getElementById("dropdown");
        Home = Home.innerText;
        Visiting = Visiting.innerText;
        bankFee = bankFee.options[bankFee.selectedIndex].text;
        localStorage.setItem('HomeCurrency', Home);
        localStorage.setItem('VisitingCurrency', Visiting);
        localStorage.setItem('BankFee', bankFee);
    }
    loadData(){
        let home = localStorage.getItem("HomeCurrency");
        let visiting = localStorage.getItem("VisitingCurrency");
        let BankFee = localStorage.getItem("BankFee");
        if(home != null){
            this.setHome(home);
            this.setHomeFlag(home)
        }
        if(visiting != null){
            this.setVisiting(visiting);
            this.setVisitingFlag(visiting);
        }
        if(BankFee != null){
            this.setBankFee(BankFee);
        }
    }

    setHome(HomeType){
        let div = document.getElementById("HomePicture");
        div.innerText = HomeType;
    }
    setVisiting(VisitingType){
        let div = document.getElementById("VisingPicture");
        div.innerText = VisitingType;
    }
    setBankFee(BankFee){
        let index = {
            "0%": 0, "2%":1, "4%":2, "6%":3
        };
        let newIndex = index[BankFee];
        document.getElementById('dropdown').getElementsByTagName('option')[newIndex].selected = true;
    }
    setVisitingFlag(VisitingType){
        let img = document.getElementById("Flag1");
        img.setAttribute("src", `${VisitingType}.png`);
    }
    setHomeFlag(HomeType){
        let img = document.getElementById("Flag2");
        img.setAttribute("src", `${HomeType}.png`);
    }


    calcPrice(){
        let finalValue = 0;
        let amount = document.getElementById("vInput");
        let home = document.getElementById("HomePicture");
        let visiting = document.getElementById("VisingPicture");
        let bankFee = document.getElementById("dropdown");
        bankFee = parseInt(bankFee.value);
        let newText = amount.innerText;
        let newAmount = parseInt(newText);

        let HomeType = home.innerText;
        let VisitingType = visiting.innerText;

        finalValue = this.getPrice(newAmount, HomeType, VisitingType, bankFee);
        return finalValue;
    }
    getPrice(amount, HomeType, VisitingType, bankFee){
        let result = 0;
        let rateDict = this.getRates();
        if(HomeType === VisitingType){
            return amount;
        }
        else if(HomeType === "Euro"){
            let Rate = rateDict[VisitingType];
            result = amount/Rate;
        } else if(VisitingType === "Euro"){
            let Rate = rateDict[HomeType];
            result = amount*Rate;
        } else if(VisitingType !== "Euro" || HomeType !== "Euro"){
            let rateVisiting = rateDict[VisitingType];
            let rateHome = rateDict[HomeType];
            amount = amount/rateVisiting;
            result = amount*rateHome;
        }
        let x = result/100;
        x = x * bankFee;
        result = result + x;
        return result;
    }

    newRates(elem){
        let rateDict = {
            "Euro": 1, "GBP": 0, "PLN": 0,"USD": 0, "JPY": 0, "BGN":0, "CZK":0,
            "DKK":0, "HUF":0, "RON": 0, "SEK":0, "CHF":0, "ISK":0,
            "NOK":0, "HRK":0, "RUB":0, "TRY":0, "AUD":0, "BRL":0,
            "CAD":0, "CNY":0, "HKD":0, "IDR":0,"ILS":0, "INR":0,
            "KRW":0, "MXN":0,"MYR":0, "NZD":0, "PHP":0,"SGD":0,"THB":0,
            "ZAR":0
        };
        let parser=new DOMParser();
        let xmlDoc=parser.parseFromString(elem,"text/xml");
        for(let i = 2; i <= 33; i++){
            let toField = xmlDoc.getElementsByTagName("Cube")[i];
            let currency = toField.getAttribute("currency");
            let newRate = toField.getAttribute("rate");
            rateDict[currency] = newRate
        }
        let jsonRates = JSON.stringify(rateDict);
        localStorage.setItem('storedRates', jsonRates);
    }
    getRates(){
        let storedRates = localStorage.getItem("storedRates");
        storedRates = JSON.parse(storedRates);
        return storedRates;
    }


    getCurrentDate(){
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        console.log(today);
        return today;
    }
    getStoredDate(){
        let date = localStorage.getItem("Date");
        console.log(date);
        return date;
    }
    saveDate(){
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        localStorage.setItem('Date', today);
    }
}
