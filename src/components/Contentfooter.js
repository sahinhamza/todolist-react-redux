import React from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { changeActiveTab, clearCompleted, selectTodos, selectActiveTabs} from "../redux/todos/todoSlice";

export function ContentFooter() {

	const items = useSelector(selectTodos);
	const activeTab = useSelector(selectActiveTabs);

	const dispatch = useDispatch();

	const itemsLeft = items.filter(item => !item.completed).length;


	return (
		<footer className="footer">
			<span className="todo-count">
				<strong>{itemsLeft}</strong>
				item{itemsLeft > 1 && "s"} left
			</span>

			<ul className="filters">
				<li>
					<a
						href="#/"
						className={activeTab === "all" ? "selected" : ""}
						onClick={() => dispatch(changeActiveTab("all"))}
					>
						All
					</a>
				</li>
				<li>
					<a
						href="#/"
						className={activeTab === "active" ? "selected" : ""}
						onClick={() => dispatch(changeActiveTab("active"))}
					>
						Active
					</a>
				</li>
				<li>
					<a
						href="#/"
						className={activeTab === "completed" ? "selected" : ""}
						onClick={() => dispatch(changeActiveTab("completed"))}
					>
						Completed
					</a>
				</li>
			</ul>

			<button className="clear-completed" onClick={() => dispatch(clearCompleted())}>
				Clear completed
			</button>
		</footer>
	)
}