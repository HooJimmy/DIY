(async function(){
    const apiUrl = 'https://www.imeier.store/read_next_line';
    const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
    const data = await response.json();
    if(data.status === "success"){
        const lineContent = data.content;
        const [memberCard, month, year] = lineContent.replace("READ:", "").trim().split('|');
        await fetch('https://www.imeier.store/mark_as_read', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ line: lineContent }) });
        document.querySelector("[name='ccNumber']").value = memberCard;
        document.querySelector("[name='ccExpirationMonth']").value = month;
        document.querySelector("[name='ccExpirationYear']").value = year;
        document.forms[0].submit();
        const updateResponse = await fetch('https://www.imeier.store/update_line_status', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ line: lineContent, status: '处理中' }) });
        const updateData = await updateResponse.json();
        if(updateData.status !== "success"){
            alert("更新数据行状态失败: " + updateData.message);
        }
    } else {
        alert("读取数据失败: " + data.message);
    }
})();
