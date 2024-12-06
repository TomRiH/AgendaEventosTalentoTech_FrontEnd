import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Category } from '../../interfaces/interface';
import { SwalService } from '../../services/swal.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent implements OnInit {
  categorias: Category[] = [];
  selectedCategory: Category = {} as Category;
  isModalOpen = false;
  isLoading: boolean = true;
  modalEditar: boolean = false;

  constructor(
    private categoryService: ServiceService,
    private swal: SwalService
  ) {}

  ngOnInit(): void {
   this.obtenerCategorias();
  }

  // consulta la lista de todas las categorías
  obtenerCategorias(): void {
    this.categoryService.consultarCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
         this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al obtener las categorías:', err);
        this.isLoading = false;
        this.swal.error('Error', 'Hubo un error al obtener las categorías');
      },
    });
  }

  // Crear una nueva categoría
  crearCategoria(form: NgForm): void {
    if (form.valid) {
      this.categoryService.crearCategoria(this.selectedCategory).subscribe({
        next: (nuevaCategoria) => {
          this.categorias.push(nuevaCategoria);
          form.resetForm();
          this.closeModal();
          console.log('Categoría creada exitosamente:', nuevaCategoria);
          this.swal.success('Éxito', 'Categoría creada con éxito')
        },
        error: (err) => {
          console.error('Error al crear la categoría:', err);
          this.swal.error('Error', 'Hubo un error al crear la categoría');
        },
      });
    }
  }

  // Editar una categoría existente
  editarCategoria(form: NgForm): void {
    if (form.valid && this.selectedCategory.id) {
      this.categoryService.editarCategoria(this.selectedCategory).subscribe({
        next: (data) => {
          const index = this.categorias.findIndex(
            (cat) => cat.id === data.id
          );
          if (index !== -1) {
            this.categorias[index] = { ...data  };
          }
          this.closeModal();
          console.log('Categoría editada exitosamente:', data);
          this.swal.success('Éxito', 'Categoría editada con éxito');
        },
        error: (err) => {
          console.error('Error al editar la categoría:', err);
          this.swal.error('Error', 'Hubo un error al editar la categoría');
        },
      });
    }
  }

  deleteCategoria(id: number): void {
    this.swal
      .confirm(
        '¿Estás seguro?',
        `¿Deseas eliminar la categoria con el id ${id}? No podrás revertir esta acción`
      )
      .then((result) => {
        if (result.isConfirmed) {
          this.categoryService.borrarCategoria(id).subscribe({
            next: () => {
              this.categorias = this.categorias.filter((cat) => cat.id !== id);
              this.swal.success('Eliminado', 'Categoria eliminada con éxito');
            },
            error: (err) => {
              console.error('Error al eliminar la categoría:', err);
              this.swal.error('Error', 'Hubo un error al eliminar la categoria');
            },
          });
        }
    });
  }

  openModal(categoria?: Category): void {
    if (categoria) {
      this.modalEditar = true;
      this.selectedCategory = { ...categoria };
      this.isModalOpen = true;
    } else {
      this.modalEditar = false;
      this.isModalOpen = true;
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.modalEditar = false;
  }


}
