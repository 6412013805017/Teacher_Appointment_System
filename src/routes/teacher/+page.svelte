<script>
    const today = new Date().toISOString().split("T")[0];
    let selectedDate = today;

    const ttoday = new Date();
    const year = ttoday.getFullYear();
    const month = 1; // 0 = มกราคม

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const limit = Math.min(daysInMonth, 30); // จำกัดที่ 30 วัน (ถ้าเดือนนั้นมีไม่ถึงก็ใช้เท่าที่มี)

    const dates = Array.from({ length: limit }, (_, i) => {
        const date = new Date(year, month, i + 1);
        return date.toISOString().split("T")[0]; // รูปแบบ YYYY-MM-DD
    });

    const mockData = {
        [today]: [
            { time: "09:00", title: "ประชุมทีม" },
            {
                time: "11:00",
                title: "ตรวจสุขภาพ",
                description: "โรงพยาบาลกรุงเทพ",
            },
            { time: "14:00", title: "ลูกค้านัดซ่อมเครื่อง" },
        ],
    };

    function formatDateTH(dateStr) {
        const d = new Date(dateStr);
        return d.toLocaleDateString("th-TH", {
            weekday: "short",
            day: "numeric",
            month: "short",
        });
    }
</script>

<div class="container">
    <div class="sidebar">
        <div class="month-selector">
            <select name="" id="">
                <option value="">1</option>
                <option value="">1</option>
                <option value="">1</option>
                <option value="">1</option>
            </select>
        </div>
        <h2>วันที่</h2>
        {#each dates as date}
            <button
                on:click={() => (selectedDate = date)}
                class="date-button {selectedDate === date ? 'active' : ''}"
            >
                {formatDateTH(date)}
                <span>มีนัด</span>
            </button>
        {/each}
    </div>

    <div class="appointments">
        <h2>ปิดรับนัดหมาย</h2>
        <div class="timeslot">
            <button class="disable">8:00-9:00</button>
            <button>9:00-10:00</button>
            <button>10:00-11:00</button>
            <button class="disable">11:00-12:00</button>
            <button>12:00-13:00</button>
            <button class="disable">13:00-14:00</button>
            <button>14:00-15:00</button>
            <button>15:00-16:00</button>
            <button class="disable">16:00-17:00</button>
        </div>
        <h2>ตารางนัดหมาย</h2>
        {#if !mockData[selectedDate]}
            <p>ไม่มีนัดหมายในวันนี้</p>
        {:else}
            {#each mockData[selectedDate] as appt}
                <div class="appointment">
                    <div class="appointment-time">{appt.time}</div>
                    <div class="appointment-title">{appt.title}</div>
                    {#if appt.description}
                        <div class="appointment-desc">{appt.description}</div>
                    {/if}
                </div>
            {/each}
        {/if}
    </div>
</div>

<style>
    .container {
        display: flex;
        background-color: #f9f9ff;
        flex-direction: column;
        margin: auto;
        padding: 1rem;
        width: 1200px;
        height: 500px;
        border-radius: 20px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    @media (min-width: 768px) {
        .container {
            flex-direction: row;
            gap: 1rem;
        }
    }

    .sidebar {
        background-color: #eeeeee;
        padding: 0 1rem 1rem 1rem;
        border-radius: 8px;
        width: 100%;
        max-width: 150px;
        overflow-y: auto;
    }
    
    .sidebar .month-selector {
        width: 100%;
        background-color: #eeeeee;
        padding: 10px 0px;
        position: sticky;
        top: 0;
        display: flex;
        
    }

    .sidebar .month-selector select {
        flex: 1;
        padding: 10px 5px;
        border-radius: 5px;
        outline: none;
    }

    .sidebar h2 {
        font-size: 1rem;
        margin-bottom: 0.5rem;
    }

    .date-button {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 5px 10px;
        margin-bottom: 0.25rem;
        border: none;
        border-radius: 5px;
        background: none;
        text-align: left;
        cursor: pointer;
        transition: background 0.2s;
    }

    .date-button span {
        font-size: 10px;
        background-color: #96a1d6;
        border-radius: 1000px;
        padding: 2px 5px;
    }

    .date-button:hover {
        background-color: #d0d0ff;
    }

    .date-button.active {
        background-color: #4e6cf0;
        color: white;
    }

    .appointments {
        flex: 1;
        background-color: white;
        padding: 1rem;
        border-radius: 8px;
    }

    .appointments h2 {
        font-size: 1.2rem;
        margin-bottom: 1rem;
    }

    .appointment {
        padding: 0.75rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        margin-bottom: 0.75rem;
        background-color: #fafafa;
    }

    .appointment-time {
        font-weight: bold;
        color: #2a4fff;
        margin-bottom: 0.25rem;
    }

    .appointment-title {
        font-size: 1.1rem;
    }

    .appointment-desc {
        font-size: 0.9rem;
        color: #666;
    }

    .timeslot {
        display: flex;
        flex-direction: row;
        gap: 5px;
    }

    .timeslot button {
        border: none;
        outline: none;
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px 0px;
        border-radius: 5px;
        background-color: rgb(235, 235, 235);
        gap: 10px;
        transition: 0.2s;
        cursor: pointer;
    }

    .timeslot button:hover {
        background-color: rgb(214, 214, 214);
    }

    .timeslot button.disable {
        background-color: rgb(255, 0, 0);
        color: white;
    }

    .timeslot button.disable:hover {
        background-color: #ff3f3f;
    }
</style>
