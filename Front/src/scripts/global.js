document.addEventListener('DOMContentLoaded', () => {
    const table = document.querySelector('.data-table');
    if (table) {
      const headers = table.querySelectorAll('th');
      headers.forEach(header => {
        const resizer = header.querySelector('.resizer');
        if (resizer) {
          let startX, startWidth;
  
          const onMouseMove = (e) => {
            if (startX !== undefined && startWidth !== undefined) {
              const width = Math.max(startWidth + (e.pageX - startX), 50); // Define a largura mínima das colunas
              header.style.width = `${width}px`;
              const colIndex = Array.from(header.parentElement.children).indexOf(header);
              table.querySelectorAll(`tbody tr td:nth-child(${colIndex + 1})`).forEach(td => {
                td.style.width = `${width}px`;
              });
            }
          };
  
          const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
          };
  
          resizer.addEventListener('mousedown', (e) => {
            e.preventDefault(); // Evita o comportamento padrão do navegador
            startX = e.pageX;
            startWidth = header.offsetWidth;
  
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
          });
        }
      });
    }
  });
  