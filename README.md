# Spending

This script transform a folder of invoices to a list of invoices in a .csv

It only works if each invoice files is named as below : **_date-content-amount.extension_**

where :

- date has this format : **_YYMMDD_**
- content is the title. Exemple : **_invoice xxx from company yyy_**
- amount has this format : **_123e45_** or **_123E45_**
- extension can be any. Exemple : **_.pdf_**

Exemple of a complete invoice file name :

**_200201-facture 377229 LEROY MERLIN-16E60.jpg_**
