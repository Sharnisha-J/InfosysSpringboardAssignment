package excep;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.*;;
public class Fileexceptionexample {

	public static void main(String[] args) {
		try {
            File file=new File("test.txt"); // File may not exist
            Scanner sc=new Scanner(file);
            while(sc.hasNextLine()) {
                System.out.println(sc.nextLine());
            }
        }
		catch(FileNotFoundException e) {
            System.out.println("Error: File not found!");
        }
	}

}
