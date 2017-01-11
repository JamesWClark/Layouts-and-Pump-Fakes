;(function() {
    
    var memory;
    
    var nextClear = false;
    
    var lcd = document.getElementById('lcd');
    
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
    
    document.getElementById('addition').onclick = function() {
        if(!memory) {
            memory = Number(lcd.innerHTML);
            lcd.innerHTML = '';
        } else {
            lcd.innerHTML = Number(lcd.innerHTML) + memory;
            memory = null;
        }
    };
    
    document.getElementById('equals').onclick = function() {
        if(memory) {
            lcd.innerHTML = Number(lcd.innerHTML) + memory;
            memory = null;
            nextClear = true;
        }
    };
    
})();