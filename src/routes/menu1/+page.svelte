<script>
    import { onMount } from "svelte";
    import { getTeacher } from "$lib/timeSlots";

  
	let name = '';
	let date = '';
	let appointments = [];
  let loading;
  let teacherName;

  let timeSlot = '';

	const timeSlots = [
		"08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00"
	];

  onMount(async () => {
    // await loadTeacherName();
  });
  
  // async function loadTeacherName() {
  //   try {
  //     loading = true;
  //     const result = await getTeacher();
  //     if (result.success) {
  //       teacherName = result.data.reverse(); // ล่าสุดก่อน
  //       console.log(teacherName)
  //     }
  //   } catch (error) {
  //     console.error('Error loading comments:', error);
  //   } finally {
  //     loading = false;
  //   }
  // }

	function addAppointment() {
		if (name && date && timeSlot) {
			appointments = [...appointments, { name, date, timeSlot }];
			name = '';
			date = '';
			timeSlot = '';
		}
	}
</script>

<main>

	<h1>📅 ระบบนัดหมาย</h1>

	<div class="form">
    
    <input bind:value={name} placeholder="รหัสนักศึกษา" />
    <div class="gap">
      <input bind:value={name} placeholder="ชื่อ" />
      <input bind:value={name} placeholder="นามสกุล" />
    </div>
    
    <input type="date" bind:value={date} />

		{#if date}
			<div class="time-slots">
				<p>⏰ เลือกช่วงเวลา:</p>
        <div class="gap">
          {#each timeSlots as slot}
            <button
              type="button"
              class:active={timeSlot === slot}
              on:click={() => timeSlot = slot}>
              {slot}
            </button>
          {/each}

        </div>
			</div>
		{/if}

		<button class="add-btn" on:click={addAppointment}>➕ เพิ่มนัดหมาย</button>
	</div>
</main>

<style>
	main {
		padding: 2rem;
		font-family: 'Segoe UI', sans-serif;
		background: #f9f9ff;
		width: 60%;
		margin: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 20px;
	}
	h1, h2 {
		text-align: center;
		color: #333;
	}
	.form {
		background: white;
		padding: 1rem;
		border-radius: 1rem;
		box-shadow: 0 0 10px rgba(0,0,0,0.1);
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	input {
		padding: 0.7rem;
		border-radius: 0.5rem;
		border: 1px solid #ccc;
	}
	.time-slots {
		display: flex;
    flex-direction: column;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.time-slots button {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 0.5rem;
		background: #eee;
		cursor: pointer;
		transition: background 0.2s;
	}
	.time-slots button.active {
		background: #4e73df;
		color: white;
	}
	.time-slots button:hover {
		background: #cfd8ff;
	}
	.add-btn {
		background: #28a745;
		color: white;
		padding: 0.7rem;
		border: none;
		border-radius: 0.5rem;
		cursor: pointer;
	}
	.add-btn:hover {
		background: #218838;
	}
	.appointments {
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.card {
		background: white;
		padding: 1rem;
		border-radius: 0.7rem;
		box-shadow: 0 0 5px rgba(0,0,0,0.05);
	}
  .gap {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 5px;
  }
  .gap button {
    flex-grow: 1;
  }
  .gap input {
    flex-grow: 1;
  }

  @media (max-width: 600px) {
    main {
      width: 80%;
    }
  }

</style>
