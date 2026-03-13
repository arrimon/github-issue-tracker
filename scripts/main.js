// define a global arry to store all data
let allIssuesData = [];
// Fetch all issues
const allIssue = async () => {
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues'
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data)
    allIssuesData = data.data;
    totalIssue(data.data)
    displayCards(data.data)
}

// {
// "status": "success",
// "message": "Issues fetched successfully",
// "data": [
// {
// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"
// },


// Issue Count Functions
const totalIssue = (arrayData) => {
    // 1. Get the all number of items in the array
    const count = arrayData.length;
    // Debuging the results
    // console.log(count)

    // 2. Get the element
    const totalCount = document.getElementById('total-count');
    // console.log(totalCount)

    // 3. incert the value
    totalCount.innerText = `${count}`;

    // 4. OpenIssue Count
    const openIssue = arrayData.filter(item => item.status === 'open');
    const openCount = openIssue.length;
    console.log(`Open Issue: ${openCount}`)

    // 5. closedIssue Count
    const closedIssue = arrayData.filter(item => item.status === 'closed');
    const closedCount = closedIssue.length;
    console.log(`Closed Issue: ${closedCount}`)
}

// active function
const setActiveButton = (clickedId) => {
    // Array of your button IDs from HTML
    const buttonIds = ['all-btn', 'open-btn', 'close-btn'];
    
    buttonIds.forEach((id) => {
        const btn = document.getElementById(id);
        
        if (!btn) return; 

        if (id === clickedId) {
            // Add Active Styles
            btn.classList.add('bg-[#4A00FF]', 'text-white');
            btn.classList.remove('bg-white', 'text-slate-600');
        } else {
            // Remove Active Styles
            btn.classList.remove('bg-[#4A00FF]', 'text-white');
            btn.classList.add('bg-white', 'text-slate-600');
        }
    });
};

// Display Card 
const displayCards = (issues) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ''; // Clear container

    issues.forEach(issue => { // Use 'issue' (singular) to avoid confusion
        // 1. Determine Dynamic Colors/Icons based on Status
        const isClosed = issue.status === 'closed';
        const topBorderColor = isClosed ? 'border-purple-500' : 'border-emerald-400';
        const statusIcon = isClosed ? './assets/Closed- Status .png' : './assets/Open-Status.png';
        
        // 2. Map Priority styles
        const priorityClass = issue.priority === 'high' ? 'bg-red-50 text-red-500' : 
                             issue.priority === 'medium' ? 'bg-orange-50 text-orange-400' : 
                             'bg-slate-100 text-slate-400';


        // 4. Create the card string
        const cardHtml = `
            <div class="card bg-white border border-gray-100 rounded-lg overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
                <div class="p-4 flex-grow space-y-3 border-t-6 ${topBorderColor}">
                    <div class="flex justify-between items-start">
                        <span class="text-emerald-500 text-lg">
                            <img src="${statusIcon}" alt="Status" class="w-5 h-5">
                        </span>
                        <span class="badge badge-sm ${priorityClass} border-none font-bold p-2 uppercase">
                            ${issue.priority}
                        </span>
                    </div>
                    <h3 class="font-bold text-slate-800 leading-tight">${issue.title}</h3>
                    <p class="text-xs text-slate-400 line-clamp-2">${issue.description}</p>
                    
                    <div class="flex flex-wrap gap-2">
                        ${issue.labels.map(label => {
                            // UNIQUE LOGIC FOR EVERY LABEL
                            let color = 'bg-slate-100 text-slate-400';
                            let icon = 'tag';

                            if (label === 'bug') {
                                color = 'bg-red-50 text-red-500';
                                icon = 'bug';
                            } else if (label === 'enhancement') {
                                color = 'bg-green-50 text-green-500';
                                icon = 'sparkles';
                            } else if (label === 'help wanted' || label === 'help-wanted') {
                                color = 'bg-orange-50 text-orange-500';
                                icon = 'life-buoy';
                            }

                            return `
                                <span class="badge badge-sm ${color} border-none px-2 py-3 text-[10px] font-bold uppercase flex items-center gap-1">
                                    <i data-lucide="${icon}" class="h-3 w-3"></i> 
                                    ${label}
                                </span>`;
                        }).join('')}
                    </div>
                </div>

                <div class="p-4 border-t border-gray-50 bg-white space-y-1">
                    <p class="text-[11px] text-slate-400">#1 by ${issue.author}</p>
                    <p class="text-[11px] text-slate-400">${issue.createdAt}</p>
                </div>
            </div>
        `;
        
        // 5. Use insertAdjacentHTML instead of appendChild
        cardContainer.insertAdjacentHTML('beforeend', cardHtml);
    });

    // 6.show lucid icon in the card
    if (window.lucide) {
        lucide.createIcons();
    }
}


document.getElementById('all-btn').addEventListener('click', () => {
    displayCards(allIssuesData); // Show everything
    setActiveButton('all-btn')
    totalIssue(allIssuesData);
});

document.getElementById('open-btn').addEventListener('click', () => {
    const openData = allIssuesData.filter(i => i.status === 'open');
    displayCards(openData); // Show only open
    setActiveButton('open-btn')
    totalIssue(openData);
});

document.getElementById('close-btn').addEventListener('click', () => {
    const closedData = allIssuesData.filter(i => i.status === 'closed');
    displayCards(closedData); // Show only closed
    setActiveButton('close-btn')
    totalIssue(closedData);
});
allIssue()


// Search Issues
document.getElementById('btn-search').addEventListener('click', async () => {

    const input = document.getElementById('input-search');
    const searchValue = input.value.trim();

    if (!searchValue) {
        displayCards(allIssuesData);
        totalIssue(allIssuesData);
        return;
    }

    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        const issues = data.data || [];

        console.log("Search Result:", issues);

        if (issues.length === 0) {
            // If value == 0 or not matche then showing this message
            const container = document.getElementById('card-container');
            container.innerHTML = `
                <div class="col-span-full text-center py-10">
                    <h3 class="text-xl font-bold text-slate-500">
                        Issue is not available
                    </h3>
                </div>
            `;
            totalIssue([]);
            return;
        }

        displayCards(issues);
        totalIssue(issues);

    } catch (err) {
        // If server not response properly then showing this message
        console.error("Search Error:", err);

        const container = document.getElementById('card-container');
        container.innerHTML = `
            <div class="col-span-full text-center py-10">
                <h3 class="text-xl font-bold text-red-500">
                    Failed to fetch issues
                </h3>
            </div>
        `;
    }

});