(function() {
    console.log('[CS2 Helper] Script loaded. Waiting for inventory...');
    function updateItemInfo(container) {
        if (!container) return;
        if (!container.textContent.includes("Counter-Strike 2")) return;

        const nameHeader = container.querySelector('h1');
        if (!nameHeader) return;
        if (nameHeader.getAttribute('data-cs2-patched') === 'true') return;

        const allSpans = container.querySelectorAll('span');
        let wearValue = null;
        for (const span of allSpans) {
            const text = span.textContent.trim();
            if (text.startsWith("Exterior:")) {
                wearValue = text.split(':')[1].trim();
                break;
            }
        }

        if (wearValue && wearValue !== "Not Painted") {
            const currentName = nameHeader.textContent;
            if (!currentName.includes(wearValue)) {
                nameHeader.textContent = `${currentName} (${wearValue})`;
                nameHeader.setAttribute('data-cs2-patched', 'true');
            }
        }
    }

    const observerCallback = function(mutations) {
        mutations.forEach((mutation) => {
            const target = mutation.target;
            const container0 = document.getElementById('iteminfo0');
            const container1 = document.getElementById('iteminfo1');
            if (container0 && container0.contains(target)) {
                updateItemInfo(container0);
            }
            if (container1 && container1.contains(target)) {
                updateItemInfo(container1);
            }
        });
    };

    const observer = new MutationObserver(observerCallback);
    const inventoryRight = document.querySelector('.inventory_page_right');
    if (inventoryRight) {
        observer.observe(inventoryRight, {
            childList: true,
            subtree: true,
            characterData: true
        });
    } else {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
})();