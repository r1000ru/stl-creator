# Библиотека для создания STL-файлов

### Установка для использования как утилиты создания STL из файла высот:
1. Установить [NodeJS](https://nodejs.org/en/download)
2. В консоле выполнить установку пакета глобально:
  ```
  npm install -g https://github.com/r1000ru/stl-creator.git
  ```
3. Файл с высотами должен быть формата **csv** и содержать только значения высот, разделенных через запятую. Каждое смещение по оси Y должно начинаться с новой строки. Пример файла высот поля 3х3:
```
1,2,3
1,2,2
1,1,3
```
4. Для конвертации файла высот в STL, необходимо в консоле выполнить команду, указав путь к файлу высот:
```
table2stl ./my_table.csv
```
5. При удачном выполнении, утилита напишет количество треугольников на верхней поверхности и в текущей папке создасться файл с названием оригинала и расширением '.stl'
