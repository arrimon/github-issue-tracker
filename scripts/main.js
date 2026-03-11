// Fetch all issues
const allIssue = async () => {
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues'
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data)
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

        // 3. Determine Label Color and Icon (Initialize inside the loop)
        let labelColor = 'bg-slate-100 text-slate-400'; 
        let iconName = 'tag';

        if (issue.labels.includes('bug')) {
            labelColor = 'bg-red-50 text-red-500';
            iconName = 'bug';
        } else if (issue.labels.includes('enhancement')) {
            labelColor = 'bg-green-50 text-green-500';
            iconName = 'sparkles';
        } else if(issue.labels.includes('help-wanted')) { // Fixed the label name check
            labelColor = 'bg-orange-50 text-orange-500';
            iconName = 'life-buoy';
        }

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
                    
                    <div class="flex gap-2">
                        ${issue.labels.map(label => {
                            // Added 'return' here!
                            return `<span class="badge badge-sm ${labelColor} border-none px-2 py-3 text-[10px] font-bold uppercase flex items-center gap-1">
                                        <i data-lucide="${iconName}" class="h-3 w-3"></i> 
                                        ${label}
                                    </span>`;
                        }).join('')}
                    </div>
                </div>

                <div class="p-4 border-t border-gray-50 bg-white space-y-1">
                    <p class="text-[11px] text-slate-400">#by ${issue.author}</p>
                    <p class="text-[11px] text-slate-400">${new Date(issue.createdAt).toLocaleDateString()}</p>
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
});

document.getElementById('open-btn').addEventListener('click', () => {
    const openData = allIssuesData.filter(i => i.status === 'open');
    displayCards(openData); // Show only open
});

document.getElementById('close-btn').addEventListener('click', () => {
    const closedData = allIssuesData.filter(i => i.status === 'closed');
    displayCards(closedData); // Show only closed
});
allIssue()