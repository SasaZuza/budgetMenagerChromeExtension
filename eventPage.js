var menuItem = {
    "id": "spendMoney",
    "title": "Spend Money title",
    "contexts": ["selection"]
};
// We create menu item object and add parameters
// 'contexts' is option of menu item that appear in selection menu 


chrome.contextMenus.create(menuItem);
// We are using chrome method to create menu item


function isInt(value) {
    return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10));
}
// This is function that looks if selected value is integer or not


chrome.contextMenus.onClicked.addListener(function (clickData) {
    if (clickData.menuItemId == "spendMoney" && clickData.selectionText) {
        if (isInt(clickData.selectionText)) {
            chrome.storage.sync.get(['total', 'limit'], function (budget) {
                var newTotal = 0;
                if (budget.total) {
                    newTotal += parseInt(budget.total);
                }
                // This is function that add listener to check if menu item is selected and if selected item is integer
                // Then we add that value by using chrome storage API to total value in our budget app total value

                newTotal += parseInt(clickData.selectionText);
                chrome.storage.sync.set({
                    'total': newTotal
                }, function () {
                    if (newTotal >= budget.limit) {
                        var notifOptions = {
                            type: "basic",
                            iconUrl: "icon48.png",
                            title: "Limit reached!",
                            message: "Uh oh, look's like you've reached your alloted limit."
                        };
                        chrome.notifications.create('limitNotif', notifOptions);
                    }
                });
            });
        }
    }
});
// This is function that add new value that is selected to total value in app and looks if limit is reached
// If Limit is reached it outputs notification about that


chrome.storage.onChanged.addListener(function (changes) {
    chrome.browserAction.setBadgeText({
        "text": changes.total.newValue.toString()
    });
});
// This is a way of creating simple badge that display amount of total spend value 
// It's displaying that value even if extension is not activated