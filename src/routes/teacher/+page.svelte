<script>
    import { onMount } from "svelte";
    import { getTimeSlot, getTimeSlotDate } from "$lib/timeSlots";
    import { userProfile, initializeLiff, login } from "$lib/liff.js";

    onMount(async () => {
        await initializeLiff();
    });

    const dateNow = new Date();

    let loadingTimeSlot;
    let timeAppointment;
    let dateAppointment;

    const thaiWeekdays = [
        "อาทิตย์",
        "จันทร์",
        "อังคาร",
        "พุธ",
        "พฤหัสบดี",
        "ศุกร์",
        "เสาร์",
    ];
    const selectorMonthData = [
        { id: 1, name: "มกราคม" },
        { id: 2, name: "กุมภาพันธ์" },
        { id: 3, name: "มีนาคม" },
        { id: 4, name: "เมษายน" },
        { id: 5, name: "พฤษภาคม" },
        { id: 6, name: "มิถุนายน" },
        { id: 7, name: "กรกฎาคม" },
        { id: 8, name: "สิงหาคม" },
        { id: 9, name: "กันยายน" },
        { id: 10, name: "ตุลาคม" },
        { id: 11, name: "พฤศจิกายน" },
        { id: 12, name: "ธันวาคม" },
    ];
    let selectedMonthId = dateNow.getMonth() + 1;
    let selectedYear = dateNow.getFullYear();

    const today = new Date().toISOString().split("T")[0];
    let selectedDate = today;

    $: if (selectedDate) {
        console.log(selectedDate);
        loadTimeSlot();
    }

    async function loadTimeSlot() {
        const data = {
            teacher: "โซฟีย์",
            date: selectedDate,
        };
        try {
            loadingTimeSlot = true;
            const result = await getTimeSlot(data);
            if (result.success) {
                timeAppointment = result.data.reverse(); // ล่าสุดก่อน
                console.log(timeAppointment);
            }
        } catch (error) {
            console.error("Error loading comments:", error);
        } finally {
            loadingTimeSlot = false;
        }
    }

    $: if (selectedMonthId) {
        loadTimeSlotDate();
    }

    async function loadTimeSlotDate() {
        timeAppointment = [];
        const data = {
            teacher: "โซฟีย์",
            month: selectedMonthId,
            year: selectedYear,
        };
        try {
            loadingTimeSlot = true;
            const result = await getTimeSlotDate(data);
            if (result.success) {
                dateAppointment = result.data.reverse(); // ล่าสุดก่อน
                console.log(dateAppointment);
            }
        } catch (error) {
            console.error("Error loading comments:", error);
        } finally {
            loadingTimeSlot = false;
        }
    }

    function days(d) {
        let date = new Date(d);
        return date.getDate();
    }

    function showDate(d) {
        let date = new Date(d);
        return (
            date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()
        );
    }
</script>

<div class="container">
    <!-- <div class="login-prompt">
        <p>กรุณาเข้าสู่ระบบด้วย LINE เพื่อแสดงความคิดเห็น</p>
        <button on:click={login} class="login-btn">เข้าสู่ระบบด้วย LINE</button>
    </div> -->
    <div class="sidebar">
        <div class="month-selector">
            <select name="" id="" bind:value={selectedMonthId}>
                {#each selectorMonthData as m}
                    <option value={m.id}>{m.name}</option>
                {/each}
            </select>
        </div>
        <h2>วันที่</h2>
        {#each dateAppointment as item}
            <button
                on:click={() => (selectedDate = item.date)}
                class="date-button {selectedDate === days(item.date)
                    ? 'active'
                    : ''}"
            >
                {days(item.date)}
            </button>
        {/each}
    </div>

    <div class="appointments">
        <p>วันที่ที่เลือก : {showDate(selectedDate)}</p>
        <h2>ตารางนัดหมาย</h2>
        {#if loadingTimeSlot}
            <p>กำลังโหลดข้อมูล</p>
        {:else if timeAppointment.length > 0}
            {#each timeAppointment as item}
                <div class="appointment">
                    <div class="appointment-time">{item.time}</div>
                    <div class="appointment-desc">
                        รหัสนักศึกษา : {item.stdId}
                    </div>
                    <div class="appointment-title">
                        ชื่อนักศึกษา : {item.stdName}
                        {item.stdLastName}
                    </div>
                </div>
            {/each}
        {:else}
            <p>ไม่พบข้อมูล</p>
        {/if}
    </div>
</div>

<style>
    .login-prompt {
        text-align: center;
        padding: 40px;
        background: #f9f9f9;
        border-radius: 8px;
    }
    .login-btn {
        background: #06c755;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 6px;
        font-size: 16px;
        cursor: pointer;
        width: 100%;
    }

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
        overflow-y: auto;
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
