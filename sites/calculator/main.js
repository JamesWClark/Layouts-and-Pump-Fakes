;(function() {
    
    var memory;
    var operator;
    
    var nextClear = false;
    
    var lcd = document.getElementById('main-panel');
    var top = document.getElementById('top-panel');
    
    var buttons = document.getElementsByClassName('numeric');
    
    for(var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function() {
            if(nextClear) {
                lcd.innerHTML = '' + this.innerHTML;
                nextClear = false;
            } else {
                lcd.append(this.innerHTML);
            }
        };
    }
    
    document.getElementById('clear').onclick = function() {
        lcd.innerHTML = '';
        memory = null;
    };
    
    document.getElementById('equals').onclick = function() {
        if(memory) {
            lcd.innerHTML = getResult();
            top.innerHTML = '';
            memory = null;
            nextClear = true;
        }
    };
    
    var operators = document.getElementsByClassName('operator');
    
    for(var i = 0; i < operators.length; i++) {
        operators[i].onclick = function() {
            operator = this.innerHTML;
            if(!memory) {
                memory = Number(lcd.innerHTML);
                lcd.innerHTML = '';
                top.innerHTML = Number(memory) + ' ' + operator;
            } else {
                memory = null;
            }   
        };
    }
    
    function getResult() {
        var a = memory;
        var b = Number(lcd.innerHTML);
        switch(operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case 'x':
                return a * b;
            case '÷':
                return a / b;
        }
    }
    
})();