<script>
  const today = new Date().toISOString().split("T")[0];
  let selectedDate = today;

  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split("T")[0];
  });

  const mockData = {
    [today]: [
      { time: '09:00', title: 'ประชุมทีม' },
      { time: '11:00', title: 'ตรวจสุขภาพ', description: 'โรงพยาบาลกรุงเทพ' },
      { time: '14:00', title: 'ลูกค้านัดซ่อมเครื่อง' }
    ]
  };

  function formatDateTH(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('th-TH', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  }
</script>

<style>
  * {
    box-sizing: border-box;
  }

  .container {
    display: flex;
    flex-direction: column;
    max-width: 900px;
    margin: auto;
    padding: 1rem;
    height: 100%;
  }

  @media (min-width: 768px) {
    .container {
      flex-direction: row;
      gap: 1rem;
    }
  }

  .sidebar {
    background-color: #eeeeee;
    padding: 1rem;
    border-radius: 8px;
    width: 100%;
    max-width: 150px;
  }

  .sidebar h2 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  .date-button {
    display: block;
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 0.25rem;
    border: none;
    border-radius: 5px;
    background: none;
    text-align: left;
    cursor: pointer;
    transition: background 0.2s;
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
</style>

<div class="container">
  <div class="sidebar">
    <h2>วันที่</h2>
    {#each dates as date}
      <button
        on:click={() => selectedDate = date}
        class="date-button {selectedDate === date ? 'active' : ''}">
        {formatDateTH(date)}
      </button>
    {/each}
  </div>

  <div class="appointments">
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
