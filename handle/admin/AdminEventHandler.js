import { findAllMembers } from "../../api/adminApi.js";

class AdminEventHandler{
    constructor(){}

    async loadAllUserTable(div){
        const res = await findAllMembers();
        const data = await res.json();
        const table = this.createTable(data.userInfoList);
        div.appendChild(table);
    }

    createTable(members) {
        const table = document.createElement("table");
        table.className = "memberTable";

        table.innerHTML = `
            <thead>
                <tr>
                    <th>ID</th>
                    <th>닉네임</th>
                    <th>이메일</th>
                    <th>가입일</th>
                    <th>수정일</th>
                    <th>삭제일</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

        const tbody = table.querySelector("tbody");

        members.forEach(member => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${member.id}</td>
                <td>${member.nickname}</td>
                <td>${member.email}</td>
                <td>${member.createTime}</td>
                <td>${member.updateTime}</td>
                <td>${member.deletedTime}</td>
            `;

            tbody.appendChild(tr);
        });

        return table;
    }
}

const adminEventHandler = new AdminEventHandler();
export const loadAllUserTable = adminEventHandler.loadAllUserTable.bind(adminEventHandler); 
