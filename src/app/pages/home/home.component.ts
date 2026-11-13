import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HostListener } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';

// ========================================
// INTERFACES
// ========================================

interface Property {
  id: number;
  title: string;
  location: string;
  image: string;
  type: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  area: number;
  featured: boolean;
  createdAt: string;
  neighborhood: string;
}

interface FilterOption {
  value: string;
  label: string;
}

type FilterName = 'type' | 'city' | 'bedrooms' | 'parking';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  // ========================================
  // DADOS TEMPORÁRIOS DOS IMÓVEIS
  // ========================================

  properties: Property[] = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    title: `Apartamento ${index + 1}`,
    location: 'Porto Alegre',
    image: `https://placehold.co/600x400/png?text=Apartamento+${index + 1}`,
    type: 'Apartamento',
    price: 350000 + index * 45000,
    bedrooms: 2 + (index % 2),
    bathrooms: 2,
    parking: 1,
    area: 75 + index * 5,
    featured: index < 3,
    createdAt: new Date(2026, 0, index + 1).toISOString(),
    neighborhood: [
      'Moinhos de Vento',
      'Petrópolis',
      'Menino Deus',
      'Bela Vista',
      'Auxiliadora',
      'Bom Fim',
      'Três Figueiras',
      'Mont Serrat',
      'Rio Branco',
      'Jardim Botânico',
      'Higienópolis',
      'Passo d’Areia',
    ][index],
  }));

  // ========================================
  // PAGINAÇÃO - PROPRIEDADES
  // ========================================

  currentPage = 1;
  itemsPerPage = 6;

  // ========================================
  // FILTROS - PROPRIEDADES
  // ========================================

  // Busca do banner principal
  heroSearchLocation = '';

  // Placeholder responsivo do banner
  isMobile420 = window.innerWidth <= 420;

  @HostListener('window:resize')
  onWindowResize(): void {
    this.isMobile420 = window.innerWidth <= 420;
  }

  // Localização ou código
  propertyLocation = '';

  // Preço máximo
  propertyMaxPrice: number | null = null;

  // Tipo de imóvel
  propertyTypeOpen = false;
  selectedPropertyType = '';

  propertyTypeOptions: FilterOption[] = [
    { value: '', label: 'Todos os tipos' },
    { value: 'apartamento', label: 'Apartamento' },
    { value: 'casa', label: 'Casa' },
    { value: 'studio', label: 'Studio' },
  ];

  // Cidade
  propertyCityOpen = false;
  selectedPropertyCity = '';

  propertyCityOptions: FilterOption[] = [
    { value: '', label: 'Todas' },
    { value: 'porto-alegre', label: 'Porto Alegre' },
    { value: 'canoas', label: 'Canoas' },
    { value: 'gravatai', label: 'Gravataí' },
    { value: 'viamao', label: 'Viamão' },
  ];

  // Dormitórios
  propertyBedroomsOpen = false;
  selectedPropertyBedrooms = '';

  propertyBedroomsOptions: FilterOption[] = [
    { value: '', label: 'Qualquer' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
  ];

  // Vagas
  propertyParkingOpen = false;
  selectedPropertyParking = '';

  propertyParkingOptions: FilterOption[] = [
    { value: '', label: 'Qualquer' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
  ];

  // ========================================
  // IMÓVEIS EM DESTAQUE
  // ========================================

  get featuredProperties(): Property[] {
    return this.properties
      .filter((property) => property.featured)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 3);
  }

  // ========================================
  // PAGINAÇÃO - GETTERS
  // ========================================

  get totalPages(): number {
    return Math.ceil(this.totalProperties / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  get totalProperties(): number {
    return this.filteredProperties.length;
  }

  get paginatedProperties(): Property[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;

    return this.filteredProperties.slice(start, start + this.itemsPerPage);
  }

  // ========================================
  // PAGINAÇÃO - MÉTODOS
  // ========================================

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.currentPage = page;
  }

  // ========================================
  // FILTROS - BUSCA DO BANNER PRINCIPAL
  // ========================================
  searchProperties(): void {
    this.propertyLocation = this.heroSearchLocation.trim();
    this.currentPage = 1;
    this.closeAllFilters();

    document.getElementById('imoveis')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  // ========================================
  // FILTROS - NORMALIZAÇÃO DE TEXTO
  // ========================================
  private normalizeText(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  get filteredProperties(): Property[] {
    const location = this.normalizeText(this.propertyLocation);

    const selectedType = this.propertyTypeOptions.find(
      (option) => option.value === this.selectedPropertyType,
    )?.label;

    const selectedCity = this.propertyCityOptions.find(
      (option) => option.value === this.selectedPropertyCity,
    )?.label;

    return this.properties.filter((property) => {
      const propertyLocation = this.normalizeText(property.location);

      const matchesLocation =
        !location ||
        propertyLocation.includes(location) ||
        this.normalizeText(property.neighborhood).includes(location) ||
        this.normalizeText(property.title).includes(location) ||
        String(property.id) === location;

      const matchesType =
        !this.selectedPropertyType ||
        this.normalizeText(property.type) ===
          this.normalizeText(selectedType ?? '');

      const matchesCity =
        !this.selectedPropertyCity ||
        propertyLocation.includes(this.normalizeText(selectedCity ?? ''));

      const matchesBedrooms =
        !this.selectedPropertyBedrooms ||
        property.bedrooms === Number(this.selectedPropertyBedrooms);

      const matchesParking =
        !this.selectedPropertyParking ||
        property.parking === Number(this.selectedPropertyParking);

      const matchesPrice =
        this.propertyMaxPrice == null ||
        property.price <= this.propertyMaxPrice;

      return (
        matchesLocation &&
        matchesType &&
        matchesCity &&
        matchesBedrooms &&
        matchesParking &&
        matchesPrice
      );
    });
  }

  // ========================================
  // FILTROS - CONTROLE DOS DROPDOWNS
  // ========================================

  toggleFilter(filter: FilterName): void {
    const wasOpen = this.isFilterOpen(filter);

    this.closeAllFilters();

    if (!wasOpen) {
      switch (filter) {
        case 'type':
          this.propertyTypeOpen = true;
          break;

        case 'city':
          this.propertyCityOpen = true;
          break;

        case 'bedrooms':
          this.propertyBedroomsOpen = true;
          break;

        case 'parking':
          this.propertyParkingOpen = true;
          break;
      }
    }
  }

  private isFilterOpen(filter: FilterName): boolean {
    switch (filter) {
      case 'type':
        return this.propertyTypeOpen;

      case 'city':
        return this.propertyCityOpen;

      case 'bedrooms':
        return this.propertyBedroomsOpen;

      case 'parking':
        return this.propertyParkingOpen;
    }
  }

  closeAllFilters(): void {
    this.propertyTypeOpen = false;
    this.propertyCityOpen = false;
    this.propertyBedroomsOpen = false;
    this.propertyParkingOpen = false;
  }

  // ========================================
  // FILTRO - TIPO DE IMÓVEL
  // ========================================

  get selectedPropertyTypeLabel(): string {
    return (
      this.propertyTypeOptions.find(
        (option) => option.value === this.selectedPropertyType,
      )?.label ?? 'Todos os tipos'
    );
  }

  selectPropertyType(value: string): void {
    this.selectedPropertyType = value;
    this.currentPage = 1;
    this.closeAllFilters();
  }

  // ========================================
  // FILTRO - CIDADE
  // ========================================

  get selectedPropertyCityLabel(): string {
    return (
      this.propertyCityOptions.find(
        (option) => option.value === this.selectedPropertyCity,
      )?.label ?? 'Todas'
    );
  }

  selectPropertyCity(value: string): void {
    this.selectedPropertyCity = value;
    this.currentPage = 1;
    this.closeAllFilters();
  }

  // ========================================
  // FILTRO - DORMITÓRIOS
  // ========================================

  get selectedPropertyBedroomsLabel(): string {
    return (
      this.propertyBedroomsOptions.find(
        (option) => option.value === this.selectedPropertyBedrooms,
      )?.label ?? 'Qualquer'
    );
  }

  selectPropertyBedrooms(value: string): void {
    this.selectedPropertyBedrooms = value;
    this.currentPage = 1;
    this.closeAllFilters();
  }

  // ========================================
  // FILTRO - VAGAS
  // ========================================

  get selectedPropertyParkingLabel(): string {
    return (
      this.propertyParkingOptions.find(
        (option) => option.value === this.selectedPropertyParking,
      )?.label ?? 'Qualquer'
    );
  }

  selectPropertyParking(value: string): void {
    this.selectedPropertyParking = value;
    this.closeAllFilters();
  }

  // ========================================
  // FILTROS - LIMPAR TODOS
  // ========================================

  clearFilters(): void {
    // Limpa os campos de texto e valor
    this.propertyLocation = '';
    this.propertyMaxPrice = null;

    // Restaura os selects para as opções padrão
    this.selectedPropertyType = '';
    this.selectedPropertyCity = '';
    this.selectedPropertyBedrooms = '';
    this.selectedPropertyParking = '';

    // Fecha os dropdowns
    this.closeAllFilters();

    // Retorna à primeira página
    this.currentPage = 1;

    this.heroSearchLocation = '';
  }
}
