$(function () {


    chrome.storage.sync.get(['total', 'limit'], function (budget) {
        $('#total').text(budget.total);
        $('#limit').text(budget.limit);
    });
    // Callnig Chrome-API so we can always see 'total spent' value when we enter extension


    $('#spendAmount').click(function () {
        chrome.storage.sync.get(['total', 'limit'], function (budget) {
            var newTotal = 0;
            if (budget.total) {
                newTotal += parseInt(budget.total);
            }
            // When user click on button it checks out did user already spent some money
            // Then we call get-ChromeStorage-API and add values 
            // If we previosly spent money we take that value and add new value to it
            // if not we take 0 and add new value to it 

            var amount = $('#amount').val();
            if (amount) {
                newTotal += parseInt(amount);
            }
            // After that we update total value with value that is added previosly


            chrome.storage.sync.set({
                'total': newTotal
            }, function () {
                if (amount && newTotal >= budget.limit) {
                    var notifOptions = {
                        type: "basic",
                        iconUrl: "icon48.png",
                        title: "Limit reached!!!",
                        message: "You've reached limit of money that you can spent."
                    };
                    chrome.notifications.create('limitNotif', notifOptions);

                }
            });
            // After we update with 'set' ChromeStorage API
            // We create callback function that inspects if total value is > than limit
            // If it is we create objects in which we add chrome notification options (type, icon, tittle, message)
            // After that we create chrome notification  


            $('#total').text(newTotal);
            $('#amount').val('');
            // Also we update our UI

        });
    });
});