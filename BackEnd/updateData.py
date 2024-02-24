# Se listan los archivos que se utilizarán para entrenar el modelo
filenames = ["ComoFunciona.txt", 
             "Consideraciones.txt", 
             "QueEsUnFondoDeInv.txt", 
             "Brainwashing.txt", 
             "faqBanorte.txt",
             "perfiles.txt",
             "fondosInversion.txt"]

# Se agrega como prefijo la ruta relativa a cada uno de los archivos
for i in range(len(filenames)):
    filenames[i] = "datatxt/" + filenames[i]

# Se concatenan todos los archivos en uno solo llamado "compilation.txt"
with open("datatxt/compilation.txt", "w") as new_file:
    for name in filenames:
        with open(name) as f:
            for line in f:
                new_file.write(line)
            new_file.write("\n\n\n")