import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-random-facts',
  templateUrl: './random-facts.component.html',
  styleUrls: ['./random-facts.component.scss']
})
export class RandomFactsComponent {
  randomFact: string ='';
  loadingVisible = false;
  facts: any[] = [];
  editedFacts: any[] = [];
  editable: boolean = false;
  
  itemsPerPage = 5;
  currentPage = 1;

  factsurl: string = '/assets/facts.json';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

   this.http.get<string[]>(this.factsurl).subscribe(
  data => {
    console.log('Fetched data successfully:', data);
    this.facts = data;
    this.editedFacts = [...data];  // Create a copy for local edits
  },
  error => {
    console.error('Error fetching data:', error);
  }
);
  }


    async generateRandomFact() {
      this.loadingVisible = true;
      if (this.facts) {
        setTimeout(() => this.loadingVisible = false,1000); 
        this.randomFact = this.facts[Math.floor(Math.random() * this.facts.length)];
        
      }
    }
    saveItem(index: number): void {
      console.log(`Saved item at index ${index}: ${this.editedFacts[index]}`);
      // Update the local copy
      this.facts[index] = this.editedFacts[index];
      // Update the JSON file
      //this.updateJson();
    }
  
    deleteItem(index: number): void {
      // Confirm deletion 
      const confirmDeletion = confirm('Are you sure you want to delete this item?');
      if (!confirmDeletion) {
        return;
      }

      this.editedFacts.splice(index, 1)[0];
      this.facts.splice(index, 1)[0];
     // this.facts = this.facts.filter(item => item.id !== deletedItem.id);

      // Update the JSON file
      //this.updateJson();
    }
  
    addItem(): void {
      const newItem = 'New Item';
      this.editedFacts.push(newItem);
      this.facts.push(newItem);
      this.currentPage = this.totalPages;
    }
  
    updateJson(): void {
      this.http.post(this.factsurl, this.editedFacts).subscribe(
        response => {
          console.log('JSON data updated successfully:', response);
        },
        error => {
          console.error('Error updating JSON data:', error);
        }
      );
    }


    
  get paginatedFacts(): string[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.facts.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  get totalPages(): number {
    return Math.ceil(this.facts.length / this.itemsPerPage);
  }

  toogleEditable(): void {
    this.editable = !this.editable;
  }

}
