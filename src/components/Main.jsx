import React, { useState, useEffect } from "react";
import "./Main.css";
import { Task } from "./Task";

export const Main = (props) => {
  const DAY = "@DAY";
  const WEEK = "@WEEK";
  const MONTH = "@MONTH";

  const [rangeValue, setRangeValue] = useState("");
  const [taskValue, setTaskvalue] = useState("");

  const [dWidth, setDWidth] = useState(20);
  const [wWidth, setWWidth] = useState(20);
  const [mWidth, setMWidth] = useState(20);

  const [dHeight, setDHeight] = useState(50);
  const [wHeight, setWHeight] = useState(45);
  const [mHeight, setMHeight] = useState(30);

  const [dTSize, setDTSize] = useState(30);
  const [wTSize, setWTSize] = useState(30);
  const [mTSize, setMTSize] = useState(25);

  const [dailyTask, setDailyTask] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem(DAY);
      if (saved !== null) {
        return JSON.parse(saved);
      } else {
        return [];
      }
    }
  });
  const [weeklyTask, setWeeklyTask] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem(WEEK);
      if (saved !== null) {
        return JSON.parse(saved);
      } else {
        return [];
      }
    }
  });
  const [monthlyTask, setMonthlyTask] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem(MONTH);
      if (saved !== null) {
        return JSON.parse(saved);
      } else {
        return [];
      }
    }
  });

  useEffect(() => {
    window.localStorage.setItem(DAY, JSON.stringify(dailyTask));
  }, [dailyTask]);

  useEffect(() => {
    window.localStorage.setItem(WEEK, JSON.stringify(weeklyTask));
  }, [weeklyTask]);

  useEffect(() => {
    window.localStorage.setItem(MONTH, JSON.stringify(monthlyTask));
  }, [monthlyTask]);

  const changeRangeValue = (e) => {
    setRangeValue(e.target.value);
  };

  const changeTaskValue = (e) => {
    setTaskvalue(e.target.value);
  };

  const clickBtn = () => {
    if (taskValue === "") {
      alert("할 일을 써주세요!");
    } else if (rangeValue === "") {
      alert("언제까지 해야 할 일인지 써주세요!");
    } else {
      pushTask(rangeValue, taskValue);
      setRangeValue("");
      setTaskvalue("");
    }
  };

  const pushTask = (type, value) => {
    const range = {
      Daily: () => {
        let day = [...dailyTask];
        day.push({
          id: Date.now(),
          type: "daily",
          task: value,
          check: false,
          num: day.length,
          edit: false,
        });

        setDailyTask(day);
      },
      Weekly: () => {
        let week = [...weeklyTask];
        week.push({
          id: Date.now(),
          type: "weekly",
          task: value,
          check: false,
          num: week.length,
          edit: false,
        });

        setWeeklyTask(week);
      },
      Monthly: () => {
        let month = [...monthlyTask];
        month.push({
          id: Date.now(),
          type: "monthly",
          task: value,
          check: false,
          num: month.length,
          edit: false,
        });

        setMonthlyTask(month);
      },
    };
    return range[type]();
  };

  const chackChange = (id, type) => {
    const change = {
      daily: () => {
        let a = [...dailyTask];
        let b = a.findIndex((i) => i.id === id);
        a[b].check = !a[b].check;
        setDailyTask(a);
      },
      weekly: () => {
        let a = [...weeklyTask];
        let b = a.findIndex((i) => i.id === id);
        a[b].check = !a[b].check;

        setWeeklyTask(a);
      },
      monthly: () => {
        let a = [...monthlyTask];
        let b = a.findIndex((i) => i.id === id);
        a[b].check = !a[b].check;

        setMonthlyTask(a);
      },
    };
    return change[type]();
  };

  const delItem = (type, id) => {
    const del = {
      daily: () => {
        let a = [...dailyTask];
        let b = a.findIndex((i) => i.id === id);
        // a.remove(a[b]);
        a.splice(b, 1);
        setDailyTask(a);
        // console.log(type, id, a[b]);
      },
      weekly: () => {
        let a = [...weeklyTask];
        let b = a.findIndex((i) => i.id === id);
        a.splice(b, 1);
        setWeeklyTask(a);
      },
      monthly: () => {
        let a = [...monthlyTask];
        let b = a.findIndex((i) => i.id === id);
        a.splice(b, 1);
        setWeeklyTask(a);
      },
    };

    return del[type]();
  };

  const editItem = (type, id, set, editValue) => {
    const edit = {
      daily: () => {
        let a = [...dailyTask];
        let b = a.findIndex((i) => i.id === id);
        if (!set) {
          a[b].edit = !a[b].edit;
          return setDailyTask(a);
        } else {
          a[b].task = editValue;
          a[b].edit = !a[b].edit;
          return setDailyTask(a);
        }
      },
      weekly: () => {
        let a = [...weeklyTask];
        let b = a.findIndex((i) => i.id === id);
        if (!set) {
          a[b].edit = !a[b].edit;
          return setWeeklyTask(a);
        } else {
          a[b].task = editValue;
          a[b].edit = !a[b].edit;
          return setWeeklyTask(a);
        }
      },
      monthly: () => {
        let a = [...monthlyTask];
        let b = a.findIndex((i) => i.id === id);
        if (!set) {
          a[b].edit = !a[b].edit;
          return setMonthlyTask(a);
        } else {
          a[b].task = editValue;
          a[b].edit = !a[b].edit;
          return setMonthlyTask(a);
        }
      },
    };
    return edit[type]();
  };

  return (
    <div className="Main" id="main">
      <section className="main-menu">
        <h2 className="menuTitle">무엇이든지 할 수 있다!</h2>
        <input
          autoComplete="off"
          className="ipt"
          list="list"
          value={rangeValue}
          onChange={changeRangeValue}
        />
        <datalist id="list">
          <option value="Daily"></option>
          <option value="Weekly"></option>
          <option value="Monthly"></option>
        </datalist>
        <input
          autoComplete="off"
          className="ipt"
          type="text"
          value={taskValue}
          onChange={changeTaskValue}
        />
        <input
          className="button-18"
          type="submit"
          value="Submit"
          onClick={clickBtn}
        />
      </section>
      <section className="all-daily">
        <Task
          color={"rgb(134 148 159)"}
          width={dWidth}
          height={dHeight}
          titleSize={dTSize}
          setWidth={setDWidth}
          setHeight={setDHeight}
          setTSize={setDTSize}
          task={dailyTask}
          taskSet={setDailyTask}
          type={"Daily"}
          check={chackChange}
          del={delItem}
          edit={editItem}
        />
      </section>
      <section className="all-other">
        <Task
          color={"rgb(254 204 94)"}
          width={wWidth}
          height={wHeight}
          titleSize={wTSize}
          setWidth={setWWidth}
          setHeight={setWHeight}
          setTSize={setWTSize}
          task={weeklyTask}
          taskSet={setWeeklyTask}
          type={"Weekly"}
          check={chackChange}
          del={delItem}
          edit={editItem}
        />
        <Task
          color={"rgb(138 189 203)"}
          width={mWidth}
          height={mHeight}
          titleSize={mTSize}
          setWidth={setMWidth}
          setHeight={setMHeight}
          setTSize={setMTSize}
          task={monthlyTask}
          taskSet={setMonthlyTask}
          type={"Monthly"}
          check={chackChange}
          del={delItem}
          edit={editItem}
        />
      </section>
    </div>
  );
};
