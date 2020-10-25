# Spending

This script transform a folder of invoices to a list of invoices in a .csv

It only works if each invoice files is named as below :

`date-content-amount.extension`

where :

- date has this format : `YYMMDD`
- content is the title. Exemple `invoice xxx from company yyy`
- amount has this format : `123e45` or `123E45`
- extension can be any. Exemple `.pdf`

Exemple of a complete invoice file name :

`200201-facture 377229 LEROY MERLIN-16E60.jpg`
