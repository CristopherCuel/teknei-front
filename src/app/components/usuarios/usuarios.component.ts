import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon
  ],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  users: any[] = [];
  editForm: FormGroup;
  selectedUserIndex: number | null = null;
  userName: string = 'Usuario';
  currentTime: string;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      address: ['', [Validators.required, Validators.pattern('^[a-zA-Z ,]+$')]],
      postcode: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.currentTime = this.getCurrentTime();
    setInterval(() => {
      this.currentTime = this.getCurrentTime();
    }, 1000);
  }

  ngOnInit(): void {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }

    const storedUserName = localStorage.getItem('user');
    if (storedUserName) {
      this.userName = storedUserName;
    }
  }

  getUser() {
    this.userService.getRandomUser().subscribe((response: any) => {
        const user = response.results[0];
        const newUser = {
            name: `${user.name.title} ${user.name.first} ${user.name.last}`,
            address: `${user.location.city}, ${user.location.state}, ${user.location.country}`,
            postcode: user.location.postcode,
            email: user.email
        };
        this.users.push(newUser);
        this.saveUsers();
    });
  }

  saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
    window.location.reload();
  }

  selectUser(index: number) {
    this.selectedUserIndex = index;
    const user = this.users[index];
    const nameParts = user.name.split(' ');
    this.editForm.setValue({
        name: nameParts.slice(1).join(' '),
        address: user.address,
        postcode: user.postcode,
        email: user.email
    });
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);
    this.saveUsers();
    window.location.reload();
  }

  updateUser() {
    if (this.editForm.valid && this.selectedUserIndex !== null) {
        const updatedUser = {
            ...this.users[this.selectedUserIndex],
            name: this.editForm.value.name,
            address: this.editForm.value.address,
            postcode: this.editForm.value.postcode,
            email: this.editForm.value.email
        };

        this.users[this.selectedUserIndex] = updatedUser;
        this.saveUsers();
        this.selectedUserIndex = null;
        this.editForm.reset();
    }
  }

  cancelEdit() {
    this.selectedUserIndex = null;
    this.editForm.reset();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getCurrentTime(): string {
    const now = new Date();
    return `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  }
}
